import { getOAuthProviderRedirectUri } from 'auth/helpers/OAuthProviderUrl'
import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { OAuthProvider } from 'auth/OAuthProvider'
import { useCallback } from 'react'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { AuthDestination } from './AuthFlow/AuthFlowContext'
import { Center } from '@increaser/ui/ui/Center'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'

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

export const OAuthPage = () => {
  const { mutate: identify } = useIdentificationMutation()

  useHandleQueryParams<OAuthParams>(
    useCallback(
      ({ provider, code, destination }) => {
        const input = {
          provider,
          code,
          redirectUri: getOAuthProviderRedirectUri(provider, destination),
          timeZone: getTimeZone(),
        }
        identify({
          destination: destination as AuthDestination,
          queryParams: { variables: { input }, query: identifyWithOAuthQuery },
        })
      },
      [identify],
    ),
  )

  return (
    <Center>
      <Spinner />
    </Center>
  )
}
