import { useApi } from '@product/api-ui/state/ApiContext'
import { User } from '@product/entities/User'
import { useMutation } from '@tanstack/react-query'

import { useUpdateUser } from '../state/user'

type UpdateUserMutationOptions = {
  onOptimisticUpdate?: (input: Partial<User>) => void
}

export const useUpdateUserMutation = (options?: UpdateUserMutationOptions) => {
  const api = useApi()
  const updateState = useUpdateUser()

  return useMutation({
    mutationFn: async (input: Partial<User>) => {
      return api.call('updateUser', input)
    },
    onMutate: async (input: Partial<User>) => {
      updateState(input)

      options?.onOptimisticUpdate?.(input)

      return { input }
    },
  })
}
