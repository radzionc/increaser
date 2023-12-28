import { useMutation } from 'react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/app/api/hooks/useApi'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'

export const useAddSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation((set: Set) => {
    updateState({ sets: [...sets, set] })

    return api.call('addSet', set)
  })
}
