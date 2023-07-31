import { FacebookIcon } from '@increaser/ui/ui/icons/FacebookIcon'
import { GoogleIcon } from '@increaser/ui/ui/icons/GoogleIcon'

export enum OAuthProvider {
  Google = 'google',
  Facebook = 'facebook',
}

export const AUTH_PROVIDER_NAME = {
  [OAuthProvider.Google]: 'Google',
  [OAuthProvider.Facebook]: 'Facebook',
}

export const OAUTH_PROVIDER_ICON = {
  [OAuthProvider.Google]: <GoogleIcon />,
  [OAuthProvider.Facebook]: <FacebookIcon />,
}
