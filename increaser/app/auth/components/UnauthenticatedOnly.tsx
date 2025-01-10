import { ComponentWithChildrenProps } from '@lib/ui/props'

import { useEffect } from 'react'
import { useAuthRedirect } from '@increaser/app/auth/hooks/useAuthRedirect'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

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
