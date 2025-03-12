import { ApiInterface } from '@product/api-interface/ApiInterface'
import { useApi } from '@product/api-ui/state/ApiContext'
import { updateSet } from '@product/entities-utils/set/updateSet'
import { useMutation } from '@tanstack/react-query'

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
