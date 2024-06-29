import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'

export const useCreateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const api = useApi()
  const { updateState } = useUserState()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (input: ApiInterface['createProject']['input']) => {
      analytics.trackEvent('Create project', { name: input.name })

      updateState({
        projects: {
          ...projects,
          [input.id]: input,
        },
      })

      return api.call('createProject', input)
    },
  })
}
