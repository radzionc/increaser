import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'

export const useCreateGoalMutation = () => {
  const { goals } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (value: ApiInterface['createGoal']['input']) => {
      updateState({ goals: { ...goals, [value.id]: value } })

      await api.call('createGoal', value)
    },
  })
}
