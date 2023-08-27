import { graphql } from '@increaser/api-interface/client'
import { useApi } from 'api/useApi'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { removeLastArrayElement } from 'utils/removeLastArrayElement'

const deleteLastSetMutationDocument = graphql(`
  mutation removeLastSet {
    removeLastSet
  }
`)

export const useDeleteLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const { query } = useApi()

  return useMutation(async () => {
    updateState({ sets: removeLastArrayElement(sets) })

    await query(deleteLastSetMutationDocument)
  })
}
