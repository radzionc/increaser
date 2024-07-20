import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

export const useCreateNoteMutation = () => {
  const { notes } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (value: ApiInterface['createNote']['input']) => {
      updateState({ notes: { ...notes, [value.id]: value } })

      analytics.trackEvent('Create note', { name: value.name })

      await api.call('createNote', value)
    },
  })
}
