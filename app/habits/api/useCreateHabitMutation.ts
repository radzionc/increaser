import { HabitResponse } from 'habits/Habit'
import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { MS_IN_SEC } from '@increaser/utils/time'

import { graphql } from '@increaser/api-interface/client'
import { CreateHabitInput } from '@increaser/api-interface/client/graphql'

const createHabitMutationDocument = graphql(`
  mutation createHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
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

const getNewHabitOrder = (habits: HabitResponse[]) => {
  if (habits.length === 0) {
    return 0
  }

  return Math.min(...habits.map(({ order }) => order)) - 10
}

export const useCreateHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async ({ name, color, emoji }: CreateHabitInput) => {
    const input = {
      id: getId(),
      startedAt: Math.round(Date.now() / MS_IN_SEC),
      color,
      emoji,
      name,
      order: getNewHabitOrder(habits),
    }

    const habit = {
      ...input,
      successes: [],
    }

    updateState({ habits: [...habits, habit] })

    await updateRemoteState(createHabitMutationDocument, {
      input,
    })
  })
}
