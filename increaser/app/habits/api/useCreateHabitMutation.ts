import { HabitResponse } from '@increaser/app/habits/Habit'
import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'
import { MS_IN_SEC } from '@lib/utils/time'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/hooks/useApi'

const getNewHabitOrder = (habits: HabitResponse[]) => {
  if (habits.length === 0) {
    return 0
  }

  return Math.min(...habits.map(({ order }) => order)) - 10
}

export const useCreateHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation(
    async ({
      name,
      color,
      emoji,
    }: Pick<
      ApiInterface['createHabit']['input'],
      'name' | 'color' | 'emoji'
    >) => {
      const input = {
        id: getId(),
        startedAt: Math.round(Date.now() / MS_IN_SEC),
        color,
        emoji,
        name,
        order: getNewHabitOrder(Object.values(habits)),
      }

      const habit = {
        ...input,
        successes: [],
      }

      updateState({ habits: { ...habits, [habit.id]: habit } })

      await api.call('createHabit', input)
    },
  )
}
