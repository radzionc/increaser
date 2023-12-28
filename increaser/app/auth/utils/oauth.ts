import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { Path } from '@increaser/app/router/Path'
import { match } from '@lib/utils/match'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { OAuthProvider } from '@increaser/entities/OAuthProvider'

const oauthBaseUrlRecord: Record<OAuthProvider, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v4.0/dialog/oauth',
}

const oauthScopeRecord: Record<OAuthProvider, string> = {
  google:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  facebook: 'public_profile,email',
}

const oauthClientIdRecord: Record<OAuthProvider, string> = {
  google: shouldBeDefined(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
  facebook: shouldBeDefined(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID),
}

export const getOAuthRedirectUri = (provider: OAuthProvider) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}${Path.OAuth}/${provider}`

export const getOAuthUrl = (provider: OAuthProvider) => {
  const baseUrl = oauthBaseUrlRecord[provider]

  const sharedQueryParams = {
    client_id: oauthClientIdRecord[provider],
    redirect_uri: getOAuthRedirectUri(provider),
    scope: oauthScopeRecord[provider],
    response_type: 'code',
  }

  const customQueryParams = match<OAuthProvider, object>(provider, {
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
