import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { MS_IN_SEC } from '@increaser/utils/time'

import { updateHabitMutationDocument } from './useUpdateHabitMutation'

export const useResetAllHabitsMutation = () => {
  const { updateState, updateRemoteState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation(async () => {
    const sharedUpdateParams = {
      startedAt: Math.round(Date.now() / MS_IN_SEC),
      successes: [],
    }
    updateState({
      habits: habits.map((habit) => ({
        ...habit,
        ...sharedUpdateParams,
      })),
    })

    const response = await Promise.all(
      habits.map(({ id }) => {
        return updateRemoteState(updateHabitMutationDocument, {
          input: {
            id,
            ...sharedUpdateParams,
          },
        })
      }),
    )
    return response
  })
}
