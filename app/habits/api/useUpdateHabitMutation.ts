import { graphql } from '@increaser/api-interface/client'
import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

export const updateHabitMutationDocument = graphql(`
  mutation updateHabit($input: UpdateHabitInput!) {
    updateHabit(input: $input) {
      id
      name
      emoji
      color
      startedAt
      successes
      order
    }
  }
`)

type UpdateHabitParams = Pick<HabitResponse, 'id'> &
  Partial<
    Pick<
      HabitResponse,
      'name' | 'color' | 'emoji' | 'startedAt' | 'successes' | 'order'
    >
  >

export const useUpdateHabitMutation = () => {
  const { updateState, updateRemoteState } = useUserState()
  const { habits } = useAssertUserState()

  return useMutation(async (input: UpdateHabitParams) => {
    updateState({
      habits: habits.map((habit) =>
        habit.id === input.id ? { ...habit, ...input } : habit,
      ),
    })

    const habitResult = await updateRemoteState(updateHabitMutationDocument, {
      input,
    })

    return habitResult as HabitResponse
  })
}
