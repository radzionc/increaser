import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from 'react-query'
import { Set } from '@increaser/app/sets/Set'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'
import { updateLastArrayElement } from '@increaser/app/utils/updateLastArrayElement'

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
