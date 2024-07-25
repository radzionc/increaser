import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { VisionAttribute } from '@increaser/entities/Vision'

export const useCreateVisionAttributeMutation = () => {
  const { vision } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (value: VisionAttribute) => {
      updateState({ vision: { ...vision, [value.id]: value } })

      analytics.trackEvent('Create vision attribute', { name: value.name })

      const newValue = await api.call('createUserEntity', {
        value,
        entity: 'visionAttribute',
      })

      updateState({ vision: { ...vision, [newValue.id]: newValue } })
    },
  })
}
