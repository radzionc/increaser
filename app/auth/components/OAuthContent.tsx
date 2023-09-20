import { useCallback } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { AuthView } from './AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { useIdentifyWithOAuthMutation } from 'auth/hooks/identifyWithOAuthMutation'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthRedirectUri } from 'auth/utils/oauth'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { QueryApiError } from 'api/useApi'

interface OAuthParams {
  code: string
}

interface OAuthContentProps {
  provider: AuthProvider
}

export const OAuthContent = ({ provider }: OAuthContentProps) => {
  const { mutate: identify, error } = useIdentifyWithOAuthMutation()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ code }) => {
        identify({
          provider,
          code,
          redirectUri: getOAuthRedirectUri(provider),
          timeZone: getCurrentTimezoneOffset(),
        })
      },
      [identify, provider],
    ),
  )

  return (
    <AuthView title={`Continue with ${oauthProviderNameRecord[provider]}`}>
      <AuthConfirmationStatus error={error as QueryApiError | undefined} />
    </AuthView>
  )
}
