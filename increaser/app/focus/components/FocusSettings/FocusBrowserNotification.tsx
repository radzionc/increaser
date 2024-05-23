import { analytics } from '@increaser/app/analytics'
import { useCallback } from 'react'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Switch } from '@lib/ui/inputs/Switch'

export const FocusBrowserNotification = () => {
  const { hasTimerBrowserNotification, setHasTimerBrowserNotification } =
    useFocus()

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
  }, [hasTimerBrowserNotification, setHasTimerBrowserNotification])

  return (
    <Switch
      size="s"
      label="Browser notifications"
      onChange={handleChange}
      value={hasTimerBrowserNotification}
    />
  )
}
