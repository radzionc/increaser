import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

interface DeleteProjectMutationInput {
  id: string
}

export const deleteProjectMutation = `
  mutation deleteProject($input: DeleteProjectInput!) {
    deleteProject(input: $input)
  }
`

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

      await updateRemoteState({
        query: deleteProjectMutation,
        variables: {
          input: {
            id,
          },
        },
      })
    },
    {
      onSuccess: params?.onSuccess,
    },
  )
}
