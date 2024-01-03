import { User } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from 'react-query'
import { useUserState } from '@increaser/app/user/state/UserStateContext'

export const useUpdateUserMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()

  return useMutation(async (input: Partial<User>) => {
    updateState(input)

    return api.call('updateUser', input)
  })
}
