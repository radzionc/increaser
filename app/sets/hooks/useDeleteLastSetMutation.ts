import { useApi } from 'api/hooks/useApi'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { removeLastArrayElement } from 'utils/removeLastArrayElement'

export const useDeleteLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const api = useApi()

  return useMutation(async () => {
    updateState({ sets: removeLastArrayElement(sets) })

    await api.call('removeLastSet', undefined)
  })
}
