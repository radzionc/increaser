import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import gql from 'graphql-tag'
import { addSet } from '../services/addSet'
import { Set } from '../../users/User'
import { removeLastSet } from '../services/removeLastSet'

export const editLastSetTypeDefs = gql`
  input SetInput {
    start: Float!
    end: Float!
    projectId: ID
  }

  extend type Mutation {
    editLastSet(set: SetInput!): Boolean
  }
`

export const editLastSet = async (
  _: any,
  { set }: { set: Set },
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await removeLastSet(userId)
  await addSet(userId, set)

  return true
}
