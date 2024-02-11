import { useApi } from '@increaser/api-ui/hooks/useApi'
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
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({ id }: DeleteProjectMutationInput) => {
      updateState({
        projects: projects.filter((project) => project.id !== id),
      })

      return api.call('deleteProject', {
        id,
      })
    },
    onSuccess: params?.onSuccess,
  })
}
