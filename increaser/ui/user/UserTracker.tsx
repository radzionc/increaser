import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useEffect } from 'react'
import { useUser } from './state/user'
import { setUserIdForErrorMonitoring } from '../errors/errorMonitoring'

export const UserTracker = () => {
  const { id } = useUser()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.setUser(id)
    setUserIdForErrorMonitoring(id)
  }, [id, analytics])

  return null
}
