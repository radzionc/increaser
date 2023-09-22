import { useCallback } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { AuthView } from './AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { OAuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthRedirectUri } from 'auth/utils/oauth'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { QueryApiError } from 'api/useApi'
import { useAuthenticateWithOAuthMutation } from 'auth/hooks/useAuthenticateWithOAuthMutation'

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
    <AuthView title={`Continue with ${oauthProviderNameRecord[provider]}`}>
      <AuthConfirmationStatus error={error as QueryApiError | undefined} />
    </AuthView>
  )
}
