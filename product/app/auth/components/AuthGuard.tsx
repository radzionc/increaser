import { ChildrenProp } from '@lib/ui/props'
import { useAuthRedirect } from '@product/app/auth/hooks/useAuthRedirect'
import { useAuthSession } from '@product/app/auth/hooks/useAuthSession'
import { useEffect } from 'react'

export const AuthGuard = ({ children }: ChildrenProp) => {
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
