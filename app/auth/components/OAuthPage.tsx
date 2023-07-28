import { assertQueryParams } from 'auth/helpers/assertQueryParams'
import { getOAuthProviderRedirectUri } from 'auth/helpers/OAuthProviderUrl'
import { useHandleIdentificationFailure } from 'auth/hooks/useHandleIdentificationFailure'
import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { OAuthProvider } from 'auth/OAuthProvider'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { AuthDestination } from './AuthFlow/AuthFlowContext'

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

interface SharedOAuthQueryParams {
  code: string
  provider: string
  destination: AuthDestination
}

export const OAuthPage = () => {
  const { mutateAsync: identify } = useIdentificationMutation()

  const { mutate: processOAuthParams, error } = useMutation(async () => {
    const {
      code,
      provider: loverCaseProvider,
      destination,
    } = assertQueryParams([
      'code',
      'provider',
      'destination',
    ]) as SharedOAuthQueryParams

    const provider = loverCaseProvider.toUpperCase() as OAuthProvider
    if (!Object.values(OAuthProvider).includes(provider)) {
      throw new Error('Unsupported OAuth provider')
    }

    const input = {
      provider,
      code,
      redirectUri: getOAuthProviderRedirectUri(provider, destination),
      timeZone: getTimeZone(),
    }

    await identify({
      destination,
      queryParams: { variables: { input }, query: identifyWithOAuthQuery },
    })
  })

  useHandleIdentificationFailure(error)

  useEffect(() => {
    processOAuthParams()
  }, [processOAuthParams])

  return (
    <VStack
      gap={24}
      alignItems="center"
      justifyContent="center"
      fullWidth
      fullHeight
    >
      <HStack alignItems="center" gap={12}>
        <Spinner />
        <Text color="supporting" size={24}>
          Please wait
        </Text>
      </HStack>
    </VStack>
  )
}
