import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from '@increaser/api-ui/hooks/useApi'

interface UpdateProjectMutationInput {
  id: string
  fields: Partial<Project>
}

export const useUpdateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

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

    const project = await api.call('updateProject', {
      id,
      fields,
    })

    return project as Project | null
  })
}
