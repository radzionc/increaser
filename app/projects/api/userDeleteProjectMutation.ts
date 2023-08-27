import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

interface DeleteProjectMutationInput {
  id: string
}

export const deleteProjectMutationDocument = graphql(`
  mutation deleteProject($input: DeleteProjectInput!) {
    deleteProject(input: $input)
  }
`)

interface UseDeleteProjectMutationParams {
  onSuccess?: () => void
}

export const useDeleteProjectMutation = (
  params?: UseDeleteProjectMutationParams,
) => {
  const { projects } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(
    async ({ id }: DeleteProjectMutationInput) => {
      updateState({
        projects: projects.filter((project) => project.id !== id),
      })

      await updateRemoteState(deleteProjectMutationDocument, {
        input: {
          id,
        },
      })
    },
    {
      onSuccess: params?.onSuccess,
    },
  )
}
