import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from 'api/hooks/useApi'

interface UseCreateProjectMutationParams {
  onSuccess?: (project: Project) => void
  onOptimisticUpdate?: (project: Project) => void
}

export const useCreateProjectMutation = (
  params?: UseCreateProjectMutationParams,
) => {
  const { projects } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

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

      const project: Project = {
        ...input,
        total: 0,
        status: 'ACTIVE',
        weeks: [],
        months: [],
      }

      updateState({ projects: [...projects, project] })
      params?.onOptimisticUpdate?.(project)

      return api.call('createProject', input)
    },
    params,
  )
}
