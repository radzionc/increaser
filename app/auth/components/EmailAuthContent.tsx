import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { AuthView } from './AuthView'
import { Text } from '@increaser/ui/ui/Text'
import { getCurrentTimezoneOffset } from '@increaser/utils/getCurrentTimezoneOffset'

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
}

export const EmailAuthContent = () => {
  const { mutate: identify } = useIdentificationMutation()

  useHandleQueryParams<EmailAuthParams>(
    useCallback(
      ({ token }) => {
        const variables = {
          input: {
            token,
            timeZone: getCurrentTimezoneOffset(),
          },
        }

        identify({
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
