import { GraphQLError } from 'graphql'
import { assertEnvVar } from '../../../shared/assertEnvVar'
import { fetchJSON } from './fetchJSON'
import { OAuthValidator } from './OAuthValidator'
import { ApiErrorCode } from '../../../errors/ApiErrorCode'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

// https://developers.google.com/identity/protocols/oauth2/openid-connect
interface RawGoogleUserInfo {
  email?: string
  name?: string
  // first_name?: string,
  // last_name?: string,
  //  BCP 47
  // locale?: string,
}

export const validateWithGoogle: OAuthValidator = async ({
  code,
  redirectUri,
}) => {
  const { access_token } = await fetchJSON(GOOGLE_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify({
      client_id: assertEnvVar('GOOGLE_CLIENT_ID'),
      client_secret: assertEnvVar('GOOGLE_CLIENT_SECRET'),
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
    }),
  })

  const { email, name }: RawGoogleUserInfo = await fetchJSON(
    GOOGLE_USER_INFO_URL,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

  if (!email) {
    throw new GraphQLError(
      `Your Google account doesn't provide an email. Please try a different authentication method.`,
      {
        extensions: {
          code: ApiErrorCode.Authentication,
        },
      },
    )
  }

  return {
    email,
    name,
  }
}
