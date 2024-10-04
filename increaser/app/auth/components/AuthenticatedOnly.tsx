import { ComponentWithChildrenProps } from '@lib/ui/props'

import { useEffect } from 'react'
import { useAuthRedirect } from '@increaser/app/auth/hooks/useAuthRedirect'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

export const AuthenticatedOnly = ({ children }: ComponentWithChildrenProps) => {
  const { toAuthenticationPage } = useAuthRedirect()
  const [authSession] = useAuthSession()

  useEffect(() => {
    if (!authSession) {
      toAuthenticationPage()
    }
  }, [authSession, toAuthenticationPage])

  if (!authSession) {
    return null
  }

  return <>{children}</>
}
