import { ComponentWithChildrenProps } from '@increaser/ui/props'

import { useUserState } from './UserStateContext'
import { useEffect } from 'react'
import { useAuthRedirect } from 'auth/hooks/useAuthRedirect'
import { useAuthSession } from 'auth/hooks/useAuthSession'

export const UserStateOnly = ({ children }: ComponentWithChildrenProps) => {
  const { state } = useUserState()
  const { toAuthenticationPage } = useAuthRedirect()

  const [authSession] = useAuthSession()

  useEffect(() => {
    if (!authSession) {
      toAuthenticationPage()
    }
  }, [authSession, toAuthenticationPage])

  return state ? <>{children}</> : null
}
