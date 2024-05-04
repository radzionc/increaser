import { useMutation } from '@tanstack/react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const useAddSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation({
    mutationFn: (set: Set) => {
      updateState({ sets: order([...sets, set], (set) => set.start, 'asc') })

      return api.call('addSet', set)
    },
  })
}
