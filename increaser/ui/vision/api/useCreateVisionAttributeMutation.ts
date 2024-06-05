import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'

export const useCreateVisionAttributeMutation = () => {
  const { vision } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (
      input: ApiInterface['createVisionAttribute']['input'],
    ) => {
      updateState({ vision: { ...vision, [input.id]: input } })

      const value = await api.call('createVisionAttribute', input)

      updateState({ vision: { ...vision, [value.id]: value } })
    },
  })
}
