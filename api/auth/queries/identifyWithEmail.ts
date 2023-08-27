import { OperationContext } from '../../gql/OperationContext'
import { authorizeUser } from './authorizeUser'
import { decodeEmailAuthToken } from '../helpers/decodeEmailAuthToken'
import gql from 'graphql-tag'
import { GraphQLError } from 'graphql'
import { ApiErrorCode } from '../../errors/ApiErrorCode'
import { TokenExpiredError } from 'jsonwebtoken'

interface OAuthIdentificationResult {
  firstIdentification: boolean
  token: string
  tokenExpirationTime: number
}

interface Input {
  token: string
  timeZone: number
}

export const identifyWithEmailTypeDefs = gql`
  input IdentifyWithEmailInput {
    token: String!
    timeZone: Int!
  }

  extend type Query {
    identifyWithEmail(input: IdentifyWithEmailInput!): IdentificationResult
  }
`

export const identifyWithEmail = async (
  _: any,
  { input: { token, timeZone } }: { input: Input },
  { country }: OperationContext,
): Promise<OAuthIdentificationResult> => {
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
