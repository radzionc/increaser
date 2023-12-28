import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/app/api/hooks/useApi'
import { HabitResponse } from '@increaser/app/habits/Habit'
import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'

export const useUpdateHabitMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation(async (input: ApiInterface['updateHabit']['input']) => {
    updateState({
      habits: recordMap(habits, (habit) =>
        habit.id === input.id ? { ...habit, ...input.fields } : habit,
      ),
    })

    const habitResult = await api.call('updateHabit', input)

    return habitResult as HabitResponse
  })
}
