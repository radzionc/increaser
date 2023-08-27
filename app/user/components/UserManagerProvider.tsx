import { analytics } from 'analytics'
import { setUserIdForErrorMonitoring } from 'errors/errorMonitoring'
import { useEffect } from 'react'
import { ComponentWithChildrenProps } from 'shared/props'
import { useAssertUserState } from 'user/state/UserStateContext'

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
