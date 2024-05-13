import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteHabitParams {
  id: string
}

export const useDeleteHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteHabitParams) => {
      updateState({
        habits: omit(habits, input.id),
      })

      await api.call('deleteHabit', input)
    },
  })
}
