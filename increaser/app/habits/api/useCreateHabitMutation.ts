import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { Habit } from '@increaser/entities/Habit'

export const useCreateHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (value: Habit) => {
      updateState({ habits: { ...habits, [value.id]: value } })

      await api.call('createUserEntity', {
        entity: 'habit',
        value,
      })
    },
  })
}
