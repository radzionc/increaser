import gql from 'graphql-tag'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { getHabit, updateHabit } from '@increaser/db/habit'
import { MutationResolvers } from '../../gql/schema'

interface Input {
  id: string
  date: string
  value: boolean
}

export const trackHabitTypeDefs = gql`
  input TrackHabitInput {
    id: ID!
    date: String
    value: Boolean
  }

  extend type Mutation {
    trackHabit(input: TrackHabitInput!): Boolean
  }
`

export const trackHabit: MutationResolvers['trackHabit'] = async (
  _,
  { input: { id, date, value } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { successes } = await getHabit(userId, id)

  await updateHabit(userId, id, {
    successes: value
      ? [...successes, date]
      : successes.filter((d) => d !== date),
  })

  return value
}
