import gql from 'graphql-tag'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import * as habitsDB from '../db'

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

export const trackHabit = async (
  _: any,
  { input: { id, date, value } }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { successes } = await habitsDB.getHabit(userId, id)

  await habitsDB.updateHabit(userId, id, {
    successes: value
      ? [...successes, date]
      : successes.filter((d) => d !== date),
  })

  return value
}
