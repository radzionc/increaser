import { GetValidatedUserArgs, getValidatedUser } from './getValidatedUser'
import { OperationContext } from '../../gql/OperationContext'
import { authorizeUser } from './authorizeUser'
import gql from 'graphql-tag'

interface OAuthIdentificationResult {
  firstIdentification: boolean
  token: string
  tokenExpirationTime: number
}

type Input = GetValidatedUserArgs & {
  timeZone: number
}

export const identifyWithOAuthTypeDefs = gql`
  input IdentifyWithOAuthInput {
    provider: AuthProvider!
    code: String!
    redirectUri: String!
    timeZone: Int!
  }

  extend type Query {
    identifyWithOAuth(input: IdentifyWithOAuthInput!): IdentificationResult
  }
`

export const identifyWithOAuth = async (
  _: any,
  { input }: { input: Input },
  { country }: OperationContext,
): Promise<OAuthIdentificationResult> => {
  const { name, email } = await getValidatedUser(input)

  return authorizeUser({ timeZone: input.timeZone, email, name, country })
}
