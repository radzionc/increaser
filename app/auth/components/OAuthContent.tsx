import { useCallback } from 'react'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Center } from '@increaser/ui/ui/Center'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { Text } from '@increaser/ui/ui/Text'
import { AuthView } from './AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { useIdentifyWithOAuthMutation } from 'auth/hooks/identifyWithOAuthMutation'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { getOAuthRedirectUri } from 'auth/helpers/OAuthProviderUrl'
import { oauthProviderNameRecord } from 'auth/oauthProviderNameRecord'

interface OAuthParams {
  code: string
}

interface OAuthContentProps {
  provider: AuthProvider
}

export const OAuthContent = ({ provider }: OAuthContentProps) => {
  const { mutate: identify } = useIdentifyWithOAuthMutation()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ code }) => {
        console.log('Handle oauth query params')
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
      <Center>
        <Text size={80}>
          <Spinner />
        </Text>
      </Center>
    </AuthView>
  )
}
