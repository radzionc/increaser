import { useMutation } from '@tanstack/react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { addSets } from '@increaser/entities-utils/set/addSets'

export const useAddSetsMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { sets } = useAssertUserState()

  return useMutation({
    mutationFn: (value: Set[]) => {
      updateState({ sets: addSets({ prev: sets, value }) })

      return api.call('addSets', value)
    },
  })
}
