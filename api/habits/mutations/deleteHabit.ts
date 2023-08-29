import gql from 'graphql-tag'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { MutationResolvers } from '../../gql/schema'
import * as habitsDb from '@increaser/db/habit'

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

export const deleteHabit: MutationResolvers['deleteHabit'] = async (
  _: any,
  { input: { id } }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await habitsDb.deleteHabit(userId, id)

  return true
}
