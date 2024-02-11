import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { removeLastArrayElement } from '@increaser/app/utils/removeLastArrayElement'

export const useDeleteLastSetMutation = () => {
  const { sets } = useAssertUserState()
  const { updateState } = useUserState()

  const api = useApi()

  return useMutation({
    mutationFn: async () => {
      updateState({ sets: removeLastArrayElement(sets) })

      await api.call('removeLastSet', undefined)
    },
  })
}
