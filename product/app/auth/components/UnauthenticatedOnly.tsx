import { ChildrenProp } from '@lib/ui/props'
import { useAuthRedirect } from '@product/app/auth/hooks/useAuthRedirect'
import { useAuthSession } from '@product/app/auth/hooks/useAuthSession'
import { useEffect } from 'react'

export const UnauthenticatedOnly = ({ children }: ChildrenProp) => {
  const { toAuthenticatedPage } = useAuthRedirect()
  const [authSession] = useAuthSession()

  useEffect(() => {
    if (authSession) {
      toAuthenticatedPage()
    }
  }, [authSession, toAuthenticatedPage])

  return <>{children}</>
}
