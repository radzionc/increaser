import { AuthenticationError } from 'apollo-server-lambda'
import { OperationContext } from '../graphql/OperationContext'

export const assertUserId = ({ userId }: OperationContext) => {
  if (!userId) {
    throw new AuthenticationError('Invalid token')
  }

  return userId
}
