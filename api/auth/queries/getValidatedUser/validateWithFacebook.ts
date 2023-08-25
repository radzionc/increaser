import { assertEnvVar } from '../../../shared/assertEnvVar'
import { fetchJSON } from './fetchJSON'
import { OAuthValidator } from './OAuthValidator'
import { GraphQLError } from 'graphql'
import { ApiErrorCode } from '../../../errors/ApiErrorCode'
import { addQueryParams } from '@increaser/utils/addQueryParams'

const FACEBOOK_TOKEN_URL = 'https://graph.facebook.com/v4.0/oauth/access_token'
const FACEBOOK_USER_INFO_URL = 'https://graph.facebook.com/me'

interface RawFacebookUserInfo {
  email?: string
  name?: string
}

export const validateWithFacebook: OAuthValidator = async ({
  code,
  redirectUri,
}) => {
  const tokenUrl = addQueryParams(FACEBOOK_TOKEN_URL, {
    client_id: assertEnvVar('FACEBOOK_CLIENT_ID'),
    client_secret: assertEnvVar('FACEBOOK_CLIENT_SECRET'),
    redirect_uri: redirectUri,
    code,
  })

  const { access_token } = await fetchJSON(tokenUrl)

  const dataUrl = addQueryParams(FACEBOOK_USER_INFO_URL, {
    fields: ['email', 'name'].join(','),
    access_token,
  })

  const { email, name }: RawFacebookUserInfo = await fetchJSON(dataUrl)

  if (!email) {
    throw new GraphQLError(
      `Your Facebook account doesn't provide an email. Please try a different authentication method.`,
      {
        extensions: {
          code: ApiErrorCode.Authentication,
        },
      },
    )
  }

  return { email, name }
}
