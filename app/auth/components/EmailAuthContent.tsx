import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'
import { AuthView } from '@increaser/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { AuthConfirmationStatus } from './AuthConfirmationStatus'
import { useApiMutation } from 'api/hooks/useApiMutation'
import { useAuthSession } from 'auth/hooks/useAuthSession'

interface EmailAuthParams {
  code: string
}

export const EmailAuthContent = () => {
  const [, updateSession] = useAuthSession()

  const { mutate: authenticateWithEmail, error } = useApiMutation(
    'authSessionWithEmail',
    {
      onSuccess: updateSession,
    },
  )

  useHandleQueryParams<EmailAuthParams>(
    useCallback(
      ({ code }) => {
        authenticateWithEmail({
          code,
          timeZone: getCurrentTimezoneOffset(),
        })
      },
      [authenticateWithEmail],
    ),
  )

  return (
    <AuthView title={`Continue with email`}>
      <AuthConfirmationStatus error={error as Error | undefined} />
    </AuthView>
  )
}
