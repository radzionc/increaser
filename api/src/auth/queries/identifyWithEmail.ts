import { OperationContext } from '../../graphql/OperationContext'
import { authorizeUser } from './authorizeUser'
import { decodeEmailAuthToken } from '../helpers/decodeEmailAuthToken'
import { AuthenticationError, gql } from 'apollo-server-lambda'

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
  const email = decodeEmailAuthToken(token)
  if (!email) {
    throw new AuthenticationError('Invalid auth token')
  }

  return authorizeUser({ email, country, timeZone })
}
