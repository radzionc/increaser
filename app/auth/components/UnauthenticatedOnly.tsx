import { useAuth } from 'auth/hooks/useAuth'
import { ComponentWithChildrenProps } from '@increaser/ui/props'

import { useEffect } from 'react'
import { useAuthRedirect } from 'auth/hooks/useAuthRedirect'

export const UnauthenticatedOnly = ({
  children,
}: ComponentWithChildrenProps) => {
  const { toAuthenticatedPage } = useAuthRedirect()
  const { isUserLoggedIn } = useAuth()

  useEffect(() => {
    if (isUserLoggedIn) {
      toAuthenticatedPage()
    }
  }, [isUserLoggedIn, toAuthenticatedPage])

  return <>{children}</>
}
