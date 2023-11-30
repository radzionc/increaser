import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from 'api/hooks/useApi'

interface CreateProjectsParams {
  projects: Pick<Project, 'name' | 'emoji' | 'color'>[]
}

export const useCreateProjectsMutation = () => {
  const { projects } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

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

    return Promise.all(inputs.map((input) => api.call('createProject', input)))
  })
}
