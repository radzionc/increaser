import { useMutation } from 'react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useAddSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation((set: Set) => {
    updateState({ sets: [...sets, set] })

    return api.call('addSet', set)
  })
}
