import { ComponentWithChildrenProps } from '@increaser/ui/props'

import { useEffect } from 'react'
import { useAuthRedirect } from 'auth/hooks/useAuthRedirect'
import { useAuthSession } from 'auth/hooks/useAuthSession'

export const UnauthenticatedOnly = ({
  children,
}: ComponentWithChildrenProps) => {
  const { toAuthenticatedPage } = useAuthRedirect()
  const [authSession] = useAuthSession()

  useEffect(() => {
    if (authSession) {
      toAuthenticatedPage()
    }
  }, [authSession, toAuthenticatedPage])

  return <>{children}</>
}
