import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

export const useDeleteHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (id: string) => {
      updateState({
        habits: omit(habits, id),
      })

      await api.call('deleteUserEntity', {
        entity: 'habit',
        id,
      })
    },
  })
}
