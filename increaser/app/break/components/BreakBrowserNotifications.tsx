import { analytics } from '@increaser/app/analytics'
import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { useCallback } from 'react'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'

export const BreakBrowserNotification = () => {
  const { hasBrowserNotification, setHasBrowserNotification } = useBreak()

  const handleChange = useCallback(() => {
    if (hasBrowserNotification) {
      setHasBrowserNotification(false)
      return
    }

    window?.Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        analytics.trackEvent('Allow browser notifications')
        setHasBrowserNotification(true)
      }
    })
  }, [hasBrowserNotification, setHasBrowserNotification])

  return (
    <MinimalisticSwitch
      label="Browser notifications"
      onChange={handleChange}
      value={hasBrowserNotification}
    />
  )
}
