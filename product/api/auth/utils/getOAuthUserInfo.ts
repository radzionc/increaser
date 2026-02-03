import { match } from '@lib/utils/match'
import { OAuthProvider } from '@product/entities/OAuthProvider'

import { queryOAuthProvider } from './queryOAuthProvider'

interface GetOAuthUserInfoParams {
  accessToken: string
  provider: OAuthProvider
}

interface UserInfoResponse {
  email?: string
  name?: string
}

const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

export const getOAuthUserInfo = async ({
  accessToken,
  provider,
}: GetOAuthUserInfoParams) => {
  const actionName = `get ${provider} user info`

  return match(provider, {
    google: async () =>
      queryOAuthProvider<UserInfoResponse>(actionName, GOOGLE_USER_INFO_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  })
}
