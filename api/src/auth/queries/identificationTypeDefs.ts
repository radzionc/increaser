import gql from 'graphql-tag'

export const identificationResultTypeDef = gql`
  enum AuthProvider {
    google
    facebook
  }

  type IdentificationResult {
    id: ID
    email: String
    name: String
    token: String
    tokenExpirationTime: Int
    firstIdentification: Boolean
  }
`
