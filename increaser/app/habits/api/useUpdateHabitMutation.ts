import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateHabitMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateHabit']['input']) => {
      updateState({
        habits: recordMap(habits, (habit) =>
          habit.id === input.id ? { ...habit, ...input.fields } : habit,
        ),
      })

      return api.call('updateHabit', input)
    },
  })
}
