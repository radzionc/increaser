import { graphql } from '@increaser/api-interface/client'
import {
  UpdateUserInput,
  UserState,
} from '@increaser/api-interface/client/graphql'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

const updateUserMutationDocument = graphql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`)

export const useUpdateUserMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (input: UpdateUserInput) => {
    updateState(input as Partial<UserState>)

    await updateRemoteState(updateUserMutationDocument, {
      input,
    })
  })
}
;('')
