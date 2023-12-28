import { ComponentWithChildrenProps } from '@lib/ui/props'

import { useUserState } from './UserStateContext'
import { useEffect } from 'react'
import { useAuthRedirect } from '@increaser/app/auth/hooks/useAuthRedirect'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

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
