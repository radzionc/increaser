import { OperationContext } from '../../gql/OperationContext'
import { authorizeUser } from './authorizeUser'
import { decodeEmailAuthToken } from '../helpers/decodeEmailAuthToken'
import { GraphQLError } from 'graphql'
import { ApiErrorCode } from '../../errors/ApiErrorCode'
import { TokenExpiredError } from 'jsonwebtoken'
import { QueryResolvers } from '../../gql/schema'

export const identifyWithEmail: QueryResolvers['identifyWithEmail'] = async (
  _,
  { input: { token, timeZone } },
  { country }: OperationContext,
) => {
  try {
    const email = decodeEmailAuthToken(token)

    return authorizeUser({ email, country, timeZone })
  } catch (err) {
    let message = 'Invalid authentication token'
    if (err instanceof TokenExpiredError) {
      message = 'Authentication token expired'
    }
    throw new GraphQLError(message, {
      extensions: {
        code: ApiErrorCode.BadInput,
      },
    })
  }
}
