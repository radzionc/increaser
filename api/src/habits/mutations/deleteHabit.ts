import { gql } from 'apollo-server-lambda'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as habitsDB from '../db'

interface Input {
  id: string
}

export const deleteHabitTypeDefs = gql`
  input DeleteHabitInput {
    id: ID!
  }

  extend type Mutation {
    deleteHabit(input: DeleteHabitInput!): Boolean
  }
`

export const deleteHabit = async (
  _: any,
  { input: { id } }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await habitsDB.deleteHabit(userId, id)
}
