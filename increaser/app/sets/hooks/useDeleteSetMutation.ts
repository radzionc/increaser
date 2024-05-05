import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { deleteSet } from '@increaser/entities-utils/set/deleteSet'
import { Interval } from '@lib/utils/interval/Interval'

export const useDeleteSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation({
    mutationFn: (value: Interval) => {
      updateState({ sets: deleteSet({ sets, value }) })

      return api.call('deleteSet', value)
    },
  })
}
