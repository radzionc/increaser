import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { AuthView } from './AuthView'
import { Text } from '@increaser/ui/ui/Text'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { useIdentifyWithEmailMutation } from 'auth/hooks/useIdentifyWithEmailMutation'

interface EmailAuthParams {
  token: string
}

export const EmailAuthContent = () => {
  const { mutate: identify } = useIdentifyWithEmailMutation()

  useHandleQueryParams<EmailAuthParams>(
    useCallback(
      ({ token }) => {
        identify({
          token,
          timeZone: getCurrentTimezoneOffset(),
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
