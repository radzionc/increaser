import { ComponentWithChildrenProps } from '@increaser/ui/props'

import { useUserState } from './UserStateContext'
import { useEffect } from 'react'
import { useAuthRedirect } from 'auth/hooks/useAuthRedirect'
import { useAuth } from 'auth/components/AuthProvider'

export const UserStateOnly = ({ children }: ComponentWithChildrenProps) => {
  const { state } = useUserState()
  const { toAuthenticationPage } = useAuthRedirect()

  const { isUserLoggedIn } = useAuth()

  useEffect(() => {
    if (!isUserLoggedIn) {
      toAuthenticationPage()
    }
  }, [isUserLoggedIn, toAuthenticationPage])

  return state ? <>{children}</> : null
}
