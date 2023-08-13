import { getOAuthProviderRedirectUri } from 'auth/helpers/OAuthProviderUrl'
import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { AUTH_PROVIDER_NAME, OAuthProvider } from 'auth/OAuthProvider'
import { useCallback, useState } from 'react'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Center } from '@increaser/ui/ui/Center'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { AuthDestination } from 'auth/AuthDestination'
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
  provider: OAuthProvider
  destination: AuthDestination
}

export const OAuthContent = () => {
  const { mutate: identify } = useIdentificationMutation()
  const [provider, setProvider] = useState<undefined | OAuthProvider>()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ provider, code, destination }) => {
        setProvider(provider)
        const input = {
          provider,
          code,
          redirectUri: getOAuthProviderRedirectUri(provider, destination),
          timeZone: getTimeZone(),
        }
        identify({
          destination,
          queryParams: { variables: { input }, query: identifyWithOAuthQuery },
        })
      },
      [identify],
    ),
  )

  if (!provider) {
    return null
  }

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
