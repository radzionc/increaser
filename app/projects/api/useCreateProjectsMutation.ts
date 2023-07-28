import { Project, ProjectResponse, ProjectStatus } from 'projects/Project'
import { useMutation } from 'react-query'
import { getId } from 'shared/utils/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { createProejctMutation } from './useCreateProjectMutation'

interface CreateProjectsParams {
  projects: Pick<Project, 'name' | 'emoji' | 'color'>[]
}

export const useCreateProjectsMutation = () => {
  const { projects } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (projectParams: CreateProjectsParams) => {
    const inputs = projectParams.projects.map((projectParams) => ({
      ...projectParams,
      allocatedMinutesPerWeek: 0,
      id: getId(),
    }))

    const newProjects: ProjectResponse[] = inputs.map((input) => ({
      ...input,

      total: 0,
      status: ProjectStatus.Active,
      weeks: [],
      months: [],

      allocatedMinutesPerWeek: 0,
    }))

    updateState({ projects: [...projects, ...newProjects] })

    const response = await Promise.all(
      inputs.map((input) => {
        return updateRemoteState<ProjectResponse>({
          query: createProejctMutation,
          variables: {
            input,
          },
        })
      }),
    )
    return response
  }, {})
}
