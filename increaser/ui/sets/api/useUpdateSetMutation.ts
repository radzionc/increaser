import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { updateSet } from '@increaser/entities-utils/set/updateSet'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useUpdateUser, useUser } from '../../user/state/user'

export const useUpdateSetMutation = () => {
  const api = useApi()
  const updateState = useUpdateUser()
  const { sets } = useUser()

  return useMutation({
    mutationFn: (input: ApiInterface['updateSet']['input']) => {
      updateState({ sets: updateSet({ sets, ...input }) })

      return api.call('updateSet', input)
    },
  })
}
