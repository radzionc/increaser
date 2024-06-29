import { useMutation } from '@tanstack/react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

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

  const analytics = useAnalytics()

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
        order: getLastItemOrder(
          Object.values(projects).map((project) => project.order),
        ),
      }

      const project: Project = {
        ...input,
        status: 'active',
      }

      analytics.trackEvent('Create project', { name: project.name })

      updateState({
        projects: {
          ...projects,
          [project.id]: project,
        },
      })
      params?.onOptimisticUpdate?.(project)

      return api.call('createProject', input)
    },
    ...params,
  })
}
