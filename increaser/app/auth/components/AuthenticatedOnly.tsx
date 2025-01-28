import { ChildrenProp } from '@lib/ui/props'

import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

export const AuthenticatedOnly = ({ children }: ChildrenProp) => {
  const [authSession] = useAuthSession()

  if (!authSession) {
    return null
  }

  return <>{children}</>
}
