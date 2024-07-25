import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { Goal } from '@increaser/entities/Goal'

export const useCreateGoalMutation = () => {
  const { goals } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  const analytics = useAnalytics()

  return useMutation({
    mutationFn: async (value: Goal) => {
      updateState({ goals: { ...goals, [value.id]: value } })

      analytics.trackEvent('Create goal', { name: value.name })

      await api.call('createUserEntity', {
        entity: 'goal',
        value,
      })
    },
  })
}
