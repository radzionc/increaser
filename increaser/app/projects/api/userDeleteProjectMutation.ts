import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteProjectMutationInput {
  id: string
}

interface UseDeleteProjectMutationParams {
  onSuccess?: () => void
}

export const useDeleteProjectMutation = (
  params?: UseDeleteProjectMutationParams,
) => {
  const { projects } = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({ id }: DeleteProjectMutationInput) => {
      updateState(omit(projects, id))

      await api.call('deleteProject', {
        id,
      })
      pullRemoteState()
    },
    onSuccess: params?.onSuccess,
  })
}
