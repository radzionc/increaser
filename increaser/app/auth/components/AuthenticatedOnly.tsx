import { ComponentWithChildrenProps } from '@lib/ui/props'

import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

export const AuthenticatedOnly = ({ children }: ComponentWithChildrenProps) => {
  const [authSession] = useAuthSession()

  if (!authSession) {
    return null
  }

  return <>{children}</>
}
