import { useMutation } from 'react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/app/user/state/UserStateContext'
import { MS_IN_SEC } from '@lib/utils/time'
import { recordMap } from '@lib/utils/record/recordMap'

import { useApi } from '@increaser/app/api/hooks/useApi'

export const useResetAllHabitsMutation = () => {
  const { updateState } = useUserState()
  const { habits } = useAssertUserState()
  const api = useApi()

  return useMutation(async () => {
    const fields = {
      startedAt: Math.round(Date.now() / MS_IN_SEC),
      successes: [],
    }

    updateState({
      habits: recordMap(habits, (habit) => ({
        ...habit,
        ...fields,
      })),
    })

    const response = await Promise.all(
      Object.keys(habits).map((id) => {
        return api.call('updateHabit', {
          id,
          fields,
        })
      }),
    )

    return response
  })
}
