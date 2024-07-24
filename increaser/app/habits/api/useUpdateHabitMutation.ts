import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateHabitMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation({
    mutationFn: async ({ id, fields }: UpdateUserEntityParams<'habit'>) => {
      updateState({
        habits: recordMap(habits, (habit) =>
          habit.id === id ? { ...habit, ...fields } : habit,
        ),
      })

      return api.call('updateUserEntity', {
        entity: 'habit',
        id,
        fields,
      })
    },
  })
}
