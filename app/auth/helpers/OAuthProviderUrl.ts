import { addQueryParams } from '@increaser/utils/addQueryParams'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { Path } from 'router/Path'
import { match } from '@increaser/utils/match'

const oauthBaseUrlRecord: Record<AuthProvider, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v4.0/dialog/oauth',
}

const oauthScopeRecord: Record<AuthProvider, string> = {
  google:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  facebook: 'public_profile,email',
}

const oauthClientIdRecord: Record<AuthProvider, string> = {
  google: shouldBeDefined(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
  facebook: shouldBeDefined(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID),
}

export const getOAuthRedirectUri = (provider: AuthProvider) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}${Path.OAuth}/${provider}`

export const getOAuthUrl = (provider: AuthProvider) => {
  const baseUrl = oauthBaseUrlRecord[provider]

  const sharedQueryParams = {
    client_id: oauthClientIdRecord[provider],
    redirect_uri: getOAuthRedirectUri(provider),
    scope: oauthScopeRecord[provider],
    response_type: 'code',
  }

  const customQueryParams = match<AuthProvider, object>(provider, {
    google: () => ({
      access_type: 'offline',
      prompt: 'consent',
    }),
    facebook: () => ({
      auth_type: 'rerequest',
      display: 'popup',
    }),
  })

  return addQueryParams(baseUrl, {
    ...sharedQueryParams,
    ...customQueryParams,
  })
}
