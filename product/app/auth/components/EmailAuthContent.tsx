import { AuthView } from '@lib/ui/auth/AuthView'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useApiMutation } from '@product/api-ui/hooks/useApiMutation'
import { useAuthSession } from '@product/app/auth/hooks/useAuthSession'
import { useHandleQueryParams } from '@product/app/navigation/hooks/useHandleQueryParams'
import { useCallback } from 'react'

import { AuthConfirmationStatus } from './AuthConfirmationStatus'

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
