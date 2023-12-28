import { useApi } from '@increaser/app/api/hooks/useApi'
import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'

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

  return useMutation(
    async ({ id }: DeleteProjectMutationInput) => {
      updateState({
        projects: projects.filter((project) => project.id !== id),
      })

      return api.call('deleteProject', {
        id,
      })
    },
    {
      onSuccess: params?.onSuccess,
    },
  )
}
