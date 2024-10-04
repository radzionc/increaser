import { User } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import { useUpdateUser } from '../state/user'

export const useUpdateUserMutation = () => {
  const api = useApi()
  const updateState = useUpdateUser()

  return useMutation({
    mutationFn: async (input: Partial<User>) => {
      return api.call('updateUser', input)
    },
    onMutate: async (input: Partial<User>) => {
      updateState(input)
      return { input }
    },
  })
}
