import { gql } from 'apollo-server-lambda'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as habitsDB from '../db'

interface Input {
  id: string
  name?: string
  color?: number
  emoji?: string
  startedAt?: number
  successes?: string[]
  order?: number
}

export const updateHabitTypeDefs = gql`
  input UpdateHabitInput {
    id: ID!
    name: String
    color: Int
    order: Float
    emoji: String
    startedAt: Float
    successes: [String]
  }

  extend type Mutation {
    updateHabit(input: UpdateHabitInput!): Habit
  }
`

export const updateHabit = async (
  _: any,
  { input }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { id, ...fields } = input

  const habit = habitsDB.updateHabit(userId, id, fields)

  return habit
}
