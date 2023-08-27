import { graphql } from '@increaser/api-interface/client'
import { UserState } from '@increaser/api-interface/client/graphql'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

type UpdateUserParams = Partial<
  Pick<
    UserState,
    'name' | 'primaryGoal' | 'focusSounds' | 'tasks' | 'isAnonymous'
  >
>

const updateUserMutationDocument = graphql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
    }
  }
`)

export const useUpdateUserMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (input: UpdateUserParams) => {
    updateState(input)

    await updateRemoteState(updateUserMutationDocument, {
      input,
    })
  })
}
