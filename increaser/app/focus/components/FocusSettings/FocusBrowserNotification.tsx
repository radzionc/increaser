import { analytics } from '@increaser/app/analytics'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Switch } from '@lib/ui/inputs/Switch/Switch'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useFocus } from '@increaser/ui/focus/FocusContext'

const NotificationsSwitch = styled(Switch)`
  ${verticalPadding(8)}
`

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
    <NotificationsSwitch
      label="Notifications"
      onChange={handleChange}
      value={hasTimerBrowserNotification}
    />
  )
}
