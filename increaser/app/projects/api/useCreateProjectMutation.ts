import { useMutation } from '@tanstack/react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { analytics } from '../../analytics'

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

  return useMutation({
    mutationFn: async (
      projectParams: Pick<
        Project,
        'name' | 'color' | 'emoji' | 'allocatedMinutesPerWeek' | 'workingDays'
      >,
    ) => {
      const input = {
        ...projectParams,
        id: getId(),
      }

      const project: Project = {
        ...input,
        status: 'active',
      }

      analytics.trackEvent('Create project', { name: project.name })

      updateState({ projects: [...projects, project] })
      params?.onOptimisticUpdate?.(project)

      return api.call('createProject', input)
    },
    ...params,
  })
}
