import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { getId } from 'shared/utils/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { MS_IN_SEC } from 'utils/time'

import { habitsFragment } from './habitsFragment'

const createHabitMutation = `
mutation createHabit($input: CreateHabitInput!) {
  createHabit(input: $input) {
    ${habitsFragment}
  }
}
`

const getNewHabitOrder = (habits: HabitResponse[]) => {
  if (habits.length === 0) {
    return 0
  }

  return Math.min(...habits.map(({ order }) => order)) - 10
}

interface UseCreateHabitMutationParams {
  onSuccess?: (habit: HabitResponse) => void
}

export const useCreateHabitMutation = (
  params?: UseCreateHabitMutationParams,
) => {
  const { habits } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(
    async ({
      name,
      color,
      emoji,
    }: Pick<HabitResponse, 'name' | 'color' | 'emoji'>) => {
      const input = {
        id: getId(),
        startedAt: Math.round(Date.now() / MS_IN_SEC),
        color,
        emoji,
        name,
        order: getNewHabitOrder(habits),
      }

      const habit: HabitResponse = {
        ...input,
        successes: [],
      }

      updateState({ habits: [...habits, habit] })

      const habitResult = await updateRemoteState<HabitResponse>({
        query: createHabitMutation,
        variables: {
          input,
        },
      })

      return habitResult as HabitResponse
    },
    params,
  )
}
