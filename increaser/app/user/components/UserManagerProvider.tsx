import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { setUserIdForErrorMonitoring } from '@increaser/app/errors/errorMonitoring'
import { useEffect } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const UserManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { id } = useAssertUserState()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.setUser(id)
    setUserIdForErrorMonitoring(id)
  }, [id, analytics])

  return <>{children}</>
}
