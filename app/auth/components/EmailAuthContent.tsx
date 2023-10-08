import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { AuthView } from '@increaser/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { QueryApiError } from 'api/useApi'
import { useAuthenticateWithEmailMutation } from 'auth/hooks/useAuthenticateWithEmailMutation'

interface EmailAuthParams {
  code: string
}

export const EmailAuthContent = () => {
  const { mutate: identify, error } = useAuthenticateWithEmailMutation()

  useHandleQueryParams<EmailAuthParams>(
    useCallback(
      ({ code }) => {
        identify({
          code,
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
