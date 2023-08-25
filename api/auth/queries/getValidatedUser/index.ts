import { validateWithGoogle } from './validateWithGoogle'
import { validateWithFacebook } from './validateWithFacebook'
import { ValidatorArgs } from './OAuthValidator'

export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export interface GetValidatedUserArgs extends ValidatorArgs {
  provider: OAuthProvider
}

export const getValidatedUser = async ({
  provider,
  code,
  redirectUri,
}: GetValidatedUserArgs) => {
  const validate = {
    [OAuthProvider.GOOGLE]: validateWithGoogle,
    [OAuthProvider.FACEBOOK]: validateWithFacebook,
  }[provider]
  if (!validate) {
    throw new Error(`provider ${provider} is not supported`)
  }

  return validate({ code, redirectUri })
}
