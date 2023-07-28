import { useMainApi } from 'api/hooks/useMainApi'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { removeLastArrayElement } from 'utils/removeLastArrayElement'

const deleteLastSetMutation = `
mutation {
  removeLastSet
}
`

export const useDeleteLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const { query } = useMainApi()

  return useMutation(async () => {
    updateState({ sets: removeLastArrayElement(sets) })

    await query({
      query: deleteLastSetMutation,
    })
  })
}
