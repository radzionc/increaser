import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { MS_IN_SEC } from '@lib/utils/time'
import { recordMap } from '@lib/utils/record/recordMap'

import { useApi } from '@increaser/api-ui/state/ApiContext'

export const useResetHabitsMutation = () => {
  const { updateState } = useUserState()
  const { habits } = useAssertUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const fields = {
        startedAt: Math.round(Date.now() / MS_IN_SEC),
        successes: [],
      }

      updateState({
        habits: recordMap(habits, (habit) =>
          ids.includes(habit.id)
            ? {
                ...habit,
                ...fields,
              }
            : habit,
        ),
      })

      const response = await Promise.all(
        ids.map((id) => {
          return api.call('updateHabit', {
            id,
            fields,
          })
        }),
      )

      return response
    },
  })
}
