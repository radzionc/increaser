import { Project } from 'projects/Project'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { graphql } from '@increaser/api-interface/client'

interface UpdateProjectMutationInput {
  id: string
  fields: Partial<Project>
}

export const updateProjectMutationDocument = graphql(`
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      name
      color
      status
      emoji
      total
      allocatedMinutesPerWeek
      weeks {
        year
        week
        seconds
      }
      months {
        year
        month
        seconds
      }
    }
  }
`)

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

    const project = await updateRemoteState(updateProjectMutationDocument, {
      input: {
        id,
        ...fields,
      },
    })

    return project as Project | null
  })
}
