import { User } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import { useUserState } from '@increaser/ui/user/UserStateContext'

export const useUpdateUserMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()

  return useMutation({
    mutationFn: async (input: Partial<User>) => {
      updateState(input)

      return api.call('updateUser', input)
    },
  })
}
