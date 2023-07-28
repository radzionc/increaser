import { Project } from 'projects/Project'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { projectFragment } from './projectFragment'

interface UpdateProjectMutationInput {
  id: string
  fields: Partial<Project>
}

export const updateProjectMutation = `
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      ${projectFragment}
    }
  }
`

export const useUpdateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async ({ id, fields }: UpdateProjectMutationInput) => {
    updateState({
      projects: projects.map((project) => {
        if (project.id !== id) return project

        return {
          ...project,
          ...fields,
        }
      }),
    })

    const project = await updateRemoteState<Project>({
      query: updateProjectMutation,
      variables: {
        input: {
          id,
          ...fields,
        },
      },
    })

    return project as Project | null
  })
}
