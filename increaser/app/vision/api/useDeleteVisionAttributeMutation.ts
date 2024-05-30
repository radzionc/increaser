import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteVisionAttributeParams {
  id: string
}

export const useDeleteVisionAttributeMutation = () => {
  const { vision } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteVisionAttributeParams) => {
      updateState({
        vision: omit(vision, input.id),
      })

      await api.call('deleteVisionAttribute', input)
    },
  })
}
