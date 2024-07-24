import { recordMap } from '@lib/utils/record/recordMap'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export type TrackHabitInput = { id: string; date: string; value: boolean }

export const useTrackHabitMutation = () => {
  const { habits } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (input: TrackHabitInput): Promise<void> => {
      const newHabits = recordMap(habits, (habit) => {
        if (habit.id === input.id) {
          const { successes } = habit
          return {
            ...habit,
            successes: input.value
              ? [...successes, input.date]
              : successes.filter((d) => d !== input.date),
          }
        }

        return habit
      })
      updateState({
        habits: newHabits,
      })

      if (input.value) {
        analytics.trackEvent('Track habit', { name: habits[input.id].name })
      }

      await api.call('updateHabit', {
        id: input.id,
        fields: {
          successes: newHabits[input.id].successes,
        },
      })
    },
  })
}
