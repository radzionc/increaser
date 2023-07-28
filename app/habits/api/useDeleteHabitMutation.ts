import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

const deleteHabitMutation = `
mutation deleteHabit($input: DeleteHabitInput!) {
  deleteHabit(input: $input)
}
`

interface DeleteHabitParams {
  id: string
}

export const useDeleteHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (input: DeleteHabitParams) => {
    updateState({
      habits: habits.filter(({ id }) => id !== input.id),
    })

    await updateRemoteState<HabitResponse>({
      query: deleteHabitMutation,
      variables: {
        input,
      },
    })
  })
}
