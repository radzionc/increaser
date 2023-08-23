import { Project, ProjectResponse, ProjectStatus } from 'projects/Project'
import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { projectFragment } from './projectFragment'

export const createProejctMutation = `
mutation createProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    ${projectFragment}
  }
}
`

interface UseCreateProjectMutationParams {
  onSuccess?: (project: Project) => void
  onOptimisticUpdate?: (project: ProjectResponse) => void
}

export const useCreateProjectMutation = (
  params?: UseCreateProjectMutationParams,
) => {
  const { projects } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(
    async (
      projectParams: Pick<
        Project,
        'name' | 'color' | 'emoji' | 'allocatedMinutesPerWeek'
      >,
    ) => {
      const input = {
        ...projectParams,
        id: getId(),
      }

      const project: ProjectResponse = {
        ...input,

        total: 0,
        status: ProjectStatus.Active,
        weeks: [],
        months: [],
      }

      updateState({ projects: [...projects, project] })
      params?.onOptimisticUpdate?.(project)

      const projectResult = await updateRemoteState<Project>({
        query: createProejctMutation,
        variables: {
          input: input,
        },
      })

      return projectResult as Project
    },
    params,
  )
}
