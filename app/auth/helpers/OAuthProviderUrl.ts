import { addQueryParams } from '@increaser/utils/addQueryParams'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { OAuthProvider } from 'auth/OAuthProvider'
import { Path } from 'router/Path'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_SCOPE =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'

const FACEBOOK_AUTH_URL = 'https://www.facebook.com/v4.0/dialog/oauth'
const FACEBOOK_SCOPE = 'public_profile,email'

export const getOAuthProviderRedirectUri = (provider: OAuthProvider) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}${Path.OAuth}/${provider}`

export const getGoogleOAuthUrl = (redirectUri: string) =>
  addQueryParams(GOOGLE_AUTH_URL, {
    client_id: shouldBeDefined(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
    redirect_uri: redirectUri,
    scope: GOOGLE_SCOPE,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })

export const getFacebookOAuthUrl = (redirectUri: string) =>
  addQueryParams(FACEBOOK_AUTH_URL, {
    client_id: shouldBeDefined(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID),
    redirect_uri: redirectUri,
    scope: FACEBOOK_SCOPE,
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  })
