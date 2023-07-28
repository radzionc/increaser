import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { habitsFragment } from './habitsFragment'

export const updateHabitMutation = `
mutation updateHabit($input: UpdateHabitInput!) {
  updateHabit(input: $input) {
    ${habitsFragment}
  }
}
`

interface UseUpdateHabitMutationParams {
  onSuccess?: (habit: HabitResponse) => void
}

type UpdateHabitParams = Pick<HabitResponse, 'id'> &
  Partial<
    Pick<
      HabitResponse,
      'name' | 'color' | 'emoji' | 'startedAt' | 'successes' | 'order'
    >
  >

export const useUpdateHabitMutation = (
  params?: UseUpdateHabitMutationParams,
) => {
  const { updateState, updateRemoteState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation(async (input: UpdateHabitParams) => {
    updateState({
      habits: habits.map((habit) =>
        habit.id === input.id ? { ...habit, ...input } : habit,
      ),
    })

    const habitResult = await updateRemoteState<HabitResponse>({
      query: updateHabitMutation,
      variables: {
        input,
      },
    })

    return habitResult as HabitResponse
  }, params)
}
