import { useApi } from 'api/hooks/useApi'
import { useMutation } from 'react-query'
import { Set } from 'sets/Set'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { updateLastArrayElement } from 'utils/updateLastArrayElement'

export const useUpdateLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation(async (set: Set) => {
    updateState({
      sets: updateLastArrayElement(sets, set),
    })

    await api.call('editLastSet', set)
  })
}
