import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { createProejctMutationDocument } from './useCreateProjectMutation'
import { Project } from '@increaser/entities/Project'

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

    const newProjects: Project[] = inputs.map((input) => ({
      ...input,

      total: 0,
      status: 'ACTIVE',
      weeks: [],
      months: [],

      allocatedMinutesPerWeek: 0,
    }))

    updateState({ projects: [...projects, ...newProjects] })

    const response = await Promise.all(
      inputs.map((input) => {
        return updateRemoteState(createProejctMutationDocument, {
          input,
        })
      }),
    )
    return response
  }, {})
}
