import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteGoalParams {
  id: string
}

export const useDeleteGoalMutation = () => {
  const { goals } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteGoalParams) => {
      updateState({
        goals: omit(goals, input.id),
      })

      await api.call('deleteGoal', input)
    },
  })
}
