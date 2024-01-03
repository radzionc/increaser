import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteHabitParams {
  id: string
}

export const useDeleteHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation(async (input: DeleteHabitParams) => {
    updateState({
      habits: omit(habits, input.id),
    })

    await api.call('deleteHabit', input)
  })
}
