import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

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
      updateState({
        projects: projects.filter((project) => project.id !== id),
      })

      await api.call('deleteProject', {
        id,
      })
      pullRemoteState()
    },
    onSuccess: params?.onSuccess,
  })
}
