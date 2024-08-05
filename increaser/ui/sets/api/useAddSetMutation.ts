import { useMutation } from '@tanstack/react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { addSet } from '@increaser/entities-utils/set/addSet'

export const useAddSetMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation({
    mutationFn: (value: Set) => {
      updateState({ sets: addSet({ sets, value }) })

      return api.call('addSet', value)
    },
  })
}
