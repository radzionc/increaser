import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import gql from 'graphql-tag'
import { removeLastSet as removeLastSetService } from '../services/removeLastSet'

export const removeLastSetTypeDefs = gql`
  extend type Mutation {
    removeLastSet: Boolean
  }
`

export const removeLastSet = async (
  _: any,
  __: any,
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await removeLastSetService(userId)

  return true
}
