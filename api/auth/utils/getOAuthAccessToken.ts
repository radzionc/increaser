import { match } from '@increaser/utils/match'
import { OAuthProvider } from '../../gql/schema'
import { addQueryParams } from '@increaser/utils/addQueryParams'
import { assertEnvVar } from '../../shared/assertEnvVar'
import { queryOAuthProvider } from './queryOAuthProvider'

interface GetOAuthAccessTokenParams {
  provider: OAuthProvider
  code: string
  redirectUri: string
}

interface TokenResponse {
  access_token: string
}

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const FACEBOOK_TOKEN_URL = 'https://graph.facebook.com/v4.0/oauth/access_token'

export const getOAuthAccessToken = async ({
  provider,
  code,
  redirectUri,
}: GetOAuthAccessTokenParams) => {
  const actionName = `get ${provider} access token`
  const response = await match(provider, {
    google: async () =>
      queryOAuthProvider<TokenResponse>(actionName, GOOGLE_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify({
          client_id: assertEnvVar('GOOGLE_CLIENT_ID'),
          client_secret: assertEnvVar('GOOGLE_CLIENT_SECRET'),
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code,
        }),
      }),
    facebook: async () =>
      queryOAuthProvider<TokenResponse>(
        actionName,
        addQueryParams(FACEBOOK_TOKEN_URL, {
          client_id: assertEnvVar('FACEBOOK_CLIENT_ID'),
          client_secret: assertEnvVar('FACEBOOK_CLIENT_SECRET'),
          redirect_uri: redirectUri,
          code,
        }),
      ),
  })

  return response.access_token
}
