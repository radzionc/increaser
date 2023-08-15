import { getOAuthProviderRedirectUri } from 'auth/helpers/OAuthProviderUrl'
import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { AUTH_PROVIDER_NAME, OAuthProvider } from 'auth/OAuthProvider'
import { useCallback } from 'react'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Center } from '@increaser/ui/ui/Center'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { Text } from '@increaser/ui/ui/Text'
import { AuthView } from './AuthView'

const identificationQueryResult = `
email
name
token
tokenExpirationTime
id
firstIdentification
`

const identifyWithOAuthQuery = `
query identifyWithOAuth($input: IdentifyWithOAuthInput!) {
  identifyWithOAuth(input: $input) {
    ${identificationQueryResult}
  }
}
`

interface OAuthParams {
  code: string
}

interface OAuthContentProps {
  provider: OAuthProvider
}

export const OAuthContent = ({ provider }: OAuthContentProps) => {
  const { mutate: identify } = useIdentificationMutation()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ code }) => {
        const input = {
          provider,
          code,
          redirectUri: getOAuthProviderRedirectUri(provider),
          timeZone: getTimeZone(),
        }
        identify({
          queryParams: { variables: { input }, query: identifyWithOAuthQuery },
        })
      },
      [identify, provider],
    ),
  )

  return (
    <AuthView title={`Continue with ${AUTH_PROVIDER_NAME[provider]}`}>
      <Center>
        <Text size={80}>
          <Spinner />
        </Text>
      </Center>
    </AuthView>
  )
}
