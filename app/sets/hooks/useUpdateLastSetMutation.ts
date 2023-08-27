import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { Set } from 'sets/Set'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { updateLastArrayElement } from 'utils/updateLastArrayElement'

export const updateLastSetMutationDocument = graphql(`
  mutation editLastSet($set: SetInput!) {
    editLastSet(set: $set)
  }
`)

export const useUpdateLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (set: Set) => {
    updateState({
      sets: updateLastArrayElement(sets, set),
    })

    await updateRemoteState(updateLastSetMutationDocument, {
      set,
    })
  })
}
