import { useCallback } from 'react'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { Text } from '@increaser/ui/ui/Text'
import { AuthView } from './AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { useIdentifyWithOAuthMutation } from 'auth/hooks/identifyWithOAuthMutation'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthRedirectUri } from 'auth/utils/oauth'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'
import { VStack } from '@increaser/ui/ui/Stack'
import Link from 'next/link'
import { Path } from 'router/Path'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { InfoIcon } from '@increaser/ui/ui/icons/InfoIcon'
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
      <VStack alignItems="center" gap={20}>
        <Text
          style={{ display: 'flex' }}
          color={error ? 'alert' : 'regular'}
          size={80}
        >
          {error ? <InfoIcon /> : <Spinner />}
        </Text>
        {error ? (
          <>
            <Text centered height="large">
              {(error as QueryApiError).message}
            </Text>
            <Link style={{ width: '100%' }} href={Path.SignIn}>
              <Button kind="secondary" style={{ width: '100%' }} size="l">
                Go back
              </Button>
            </Link>
          </>
        ) : null}
      </VStack>
    </AuthView>
  )
}
