import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

const deleteHabitMutationDocument = graphql(`
  mutation deleteHabit($input: DeleteHabitInput!) {
    deleteHabit(input: $input)
  }
`)

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

    await updateRemoteState(deleteHabitMutationDocument, {
      input,
    })
  })
}
