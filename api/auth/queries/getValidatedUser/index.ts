import { validateWithGoogle } from './validateWithGoogle'
import { validateWithFacebook } from './validateWithFacebook'
import { ValidatorArgs } from './OAuthValidator'
import { AuthProvider } from '../../../gql/schema'

export interface GetValidatedUserArgs extends ValidatorArgs {
  provider: AuthProvider
}

export const getValidatedUser = async ({
  provider,
  code,
  redirectUri,
}: GetValidatedUserArgs) => {
  const validate = {
    [AuthProvider.Google]: validateWithGoogle,
    [AuthProvider.Facebook]: validateWithFacebook,
  }[provider]

  if (!validate) {
    throw new Error(`provider ${provider} is not supported`)
  }

  return validate({ code, redirectUri })
}
