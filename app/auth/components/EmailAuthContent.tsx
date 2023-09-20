import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { AuthView } from './AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { useIdentifyWithEmailMutation } from 'auth/hooks/useIdentifyWithEmailMutation'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { QueryApiError } from 'api/useApi'

interface EmailAuthParams {
  token: string
}

export const EmailAuthContent = () => {
  const { mutate: identify, error } = useIdentifyWithEmailMutation()

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
      <AuthConfirmationStatus error={error as QueryApiError | undefined} />
    </AuthView>
  )
}
