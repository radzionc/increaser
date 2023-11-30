import { useCallback } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { AuthView } from '@increaser/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { getOAuthRedirectUri } from 'auth/utils/oauth'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { useAuthenticateWithOAuthMutation } from 'auth/hooks/useAuthenticateWithOAuthMutation'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@increaser/entities/OAuthProvider'

interface OAuthParams {
  code: string
}

interface OAuthContentProps {
  provider: OAuthProvider
}

export const OAuthContent = ({ provider }: OAuthContentProps) => {
  const { mutate: authenticate, error } = useAuthenticateWithOAuthMutation()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ code }) => {
        authenticate({
          provider,
          code,
          redirectUri: getOAuthRedirectUri(provider),
          timeZone: getCurrentTimezoneOffset(),
        })
      },
      [authenticate, provider],
    ),
  )

  return (
    <AuthView title={`Continue with ${oAuthProviderName[provider]}`}>
      <AuthConfirmationStatus error={error as Error | undefined} />
    </AuthView>
  )
}
