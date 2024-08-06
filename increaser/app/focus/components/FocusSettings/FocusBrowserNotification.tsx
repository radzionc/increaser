import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useCallback } from 'react'
import { Switch } from '@lib/ui/inputs/Switch'
import { useHasTimerBrowserNotification } from '@increaser/ui/focus/hooks/useHasTimerBrowserNotification'

export const FocusBrowserNotification = () => {
  const [hasTimerBrowserNotification, setHasTimerBrowserNotification] =
    useHasTimerBrowserNotification()

  const analytics = useAnalytics()

  const handleChange = useCallback(() => {
    if (hasTimerBrowserNotification) {
      setHasTimerBrowserNotification(false)
      return
    }

    window?.Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        analytics.trackEvent('Allow browser notifications')
        setHasTimerBrowserNotification(true)
      }
    })
  }, [hasTimerBrowserNotification, setHasTimerBrowserNotification, analytics])

  return (
    <Switch
      size="s"
      label="Browser notifications"
      onChange={handleChange}
      value={hasTimerBrowserNotification}
    />
  )
}
