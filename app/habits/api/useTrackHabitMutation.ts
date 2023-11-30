import { recordMap } from '@increaser/utils/record/recordMap'
import { analytics } from 'analytics'
import { useApi } from 'api/hooks/useApi'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

interface TrackHabitParams {
  id: string
  date: string
  value: boolean
}

export const useTrackHabitMutation = () => {
  const { habits } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

  return useMutation(async (input: TrackHabitParams) => {
    updateState({
      habits: recordMap(habits, (habit) => {
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
      }),
    })

    if (input.value) {
      analytics.trackEvent('Track habit', { name: habits[input.id].name })
    }

    await api.call('trackHabit', input)
  })
}
