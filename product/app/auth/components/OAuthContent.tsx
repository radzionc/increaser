import { AuthView } from '@lib/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useApiMutation } from '@product/api-ui/hooks/useApiMutation'
import { useAuthSession } from '@product/app/auth/hooks/useAuthSession'
import { getOAuthRedirectUri } from '@product/app/auth/utils/oauth'
import { useHandleQueryParams } from '@product/app/navigation/hooks/useHandleQueryParams'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@product/entities/OAuthProvider'
import { useCallback } from 'react'

import { AuthConfirmationStatus } from './AuthConfirmationStatus'

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
