import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import { gql } from 'apollo-server-lambda'
import { addSet as addSetService } from '../services/addSet'
import { Set } from '../../users/User'

export const addSetTypeDefs = gql`
  input SetInput {
    start: Float!
    end: Float!
    projectId: ID
  }

  extend type Mutation {
    addSet(set: SetInput!): Boolean
  }
`

export const addSet = async (
  _: any,
  { set }: { set: Set },
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await addSetService(userId, set)

  return true
}
