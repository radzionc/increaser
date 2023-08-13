import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { AuthDestination } from 'auth/AuthDestination'
import { AuthView } from './AuthView'
import { Text } from '@increaser/ui/ui/Text'

const identificationQueryResult = `
email
name
token
tokenExpirationTime
id
firstIdentification
`

const identifyWithEmailQuery = `
query identifyWithEmail($input: IdentifyWithEmailInput!) {
  identifyWithEmail(input: $input) {
    ${identificationQueryResult}
  }
}
`

interface EmailAuthParams {
  token: string
  destination: AuthDestination
}

export const EmailAuthContent = () => {
  const { mutate: identify } = useIdentificationMutation()

  useHandleQueryParams<EmailAuthParams>(
    useCallback(
      ({ token, destination }) => {
        const variables = {
          input: {
            token,
            timeZone: getTimeZone(),
          },
        }

        identify({
          destination,
          queryParams: { variables, query: identifyWithEmailQuery },
        })
      },
      [identify],
    ),
  )

  return (
    <AuthView title={`Continue with email`}>
      <Center>
        <Text size={80}>
          <Spinner />
        </Text>
      </Center>
    </AuthView>
  )
}
