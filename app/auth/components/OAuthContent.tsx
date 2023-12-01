import { useCallback } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { AuthView } from '@increaser/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { getOAuthRedirectUri } from 'auth/utils/oauth'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@increaser/entities/OAuthProvider'
import { useApiMutation } from 'api/hooks/useApiMutation'
import { useAuthSession } from 'auth/hooks/useAuthSession'

interface OAuthParams {
  code: string
}

interface OAuthContentProps {
  provider: OAuthProvider
}

export const OAuthContent = ({ provider }: OAuthContentProps) => {
  const [, updateSession] = useAuthSession()

  const { mutate: authenticate, error } = useApiMutation(
    'authSessionWithOAuth',
    {
      onSuccess: updateSession,
    },
  )

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
