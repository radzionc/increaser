import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { updateSet } from '@increaser/entities-utils/set/updateSet'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'

export const useUpdateSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation({
    mutationFn: (input: ApiInterface['updateSet']['input']) => {
      updateState({ sets: updateSet({ sets, ...input }) })

      return api.call('updateSet', input)
    },
  })
}
