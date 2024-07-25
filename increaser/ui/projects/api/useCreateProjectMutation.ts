import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { Project } from '@increaser/entities/Project'

export const useCreateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (value: Project) => {
      analytics.trackEvent('Create project', { name: value.name })

      updateState({
        projects: {
          ...projects,
          [value.id]: value,
        },
      })

      return api.call('createUserEntity', {
        entity: 'project',
        value,
      })
    },
  })
}
