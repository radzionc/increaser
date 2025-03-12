import { ChildrenProp } from '@lib/ui/props'
import { useAuthSession } from '@product/app/auth/hooks/useAuthSession'

export const AuthenticatedOnly = ({ children }: ChildrenProp) => {
  const [authSession] = useAuthSession()

  if (!authSession) {
    return null
  }

  return <>{children}</>
}
