import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

export const useCreateIdeaMutation = () => {
  const { ideas } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (value: ApiInterface['createIdea']['input']) => {
      updateState({ ideas: { ...ideas, [value.id]: value } })

      analytics.trackEvent('Create idea', { name: value.name })

      await api.call('createIdea', value)
    },
  })
}
