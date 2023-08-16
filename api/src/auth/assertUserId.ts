import { GraphQLError } from 'graphql'
import { OperationContext } from '../graphql/OperationContext'
import { ApiErrorCode } from '../errors/ApiErrorCode'

export const assertUserId = ({ userId }: OperationContext) => {
  if (!userId) {
    throw new GraphQLError('Authentication required to perform this action', {
      extensions: {
        code: ApiErrorCode.Unauthenticated,
      },
    })
  }

  return userId
}
