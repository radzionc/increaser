import { analytics } from '@increaser/app/analytics'
import { setUserIdForErrorMonitoring } from '@increaser/app/errors/errorMonitoring'
import { useEffect } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

export const UserManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { id } = useAssertUserState()
  useEffect(() => {
    analytics.setUser(id)
    setUserIdForErrorMonitoring(id)
  }, [id])

  return <>{children}</>
}
