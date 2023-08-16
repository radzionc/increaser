import gql from 'graphql-tag'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as usersDb from '../../users/db'
import { PrimaryGoal } from '../User'

interface Input {
  primaryGoal?: PrimaryGoal
}

export const updateUserTypeDefs = gql`
  input FocusSoundInput {
    name: String!
    url: String!
    favourite: Boolean
  }

  input TaskInput {
    startedAt: Float!
    name: String!
    id: String!
    isCompleted: Boolean!
  }

  input UpdateUserInput {
    name: String
    country: String
    primaryGoal: String
    focusSounds: [FocusSoundInput]
    tasks: [TaskInput]
    isAnonymous: Boolean
  }

  type UpdateUserResult {
    name: String
    primaryGoal: String
    focusSounds: [FocusSound]
  }

  extend type Mutation {
    updateUser(input: UpdateUserInput!): UpdateUserResult
  }
`

export const updateUser = async (
  _: any,
  { input }: { input: Input },
  context: OperationContext,
): Promise<Input> => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, input)

  return input
}
