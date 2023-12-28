import { useApi } from '@increaser/app/api/hooks/useApi'
import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'
import { removeLastArrayElement } from '@increaser/app/utils/removeLastArrayElement'

export const useDeleteLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const api = useApi()

  return useMutation(async () => {
    updateState({ sets: removeLastArrayElement(sets) })

    await api.call('removeLastSet', undefined)
  })
}
