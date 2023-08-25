import { trackEvent } from 'analytics'
import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

const trackHabitMutation = `
mutation trackHabit($input: TrackHabitInput!) {
  trackHabit(input: $input)
}
`

interface TrackHabitParams {
  id: string
  date: string
  value: boolean
}

export const useTrackHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (input: TrackHabitParams) => {
    updateState({
      habits: habits.map((habit) => {
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

    const habit = habits.find((habit) => habit.id === input.id)
    if (habit && input.value) {
      analytics.trackEvent('Track habit', { name: habit.name })
    }

    await updateRemoteState<HabitResponse>({
      query: trackHabitMutation,
      variables: {
        input,
      },
    })
  })
}
