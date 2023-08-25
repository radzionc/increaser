import { analytics } from 'analytics'
import { useFocus } from 'focus/hooks/useFocus'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Switch } from '@increaser/ui/ui/Switch/Switch'
import { getVerticalPaddingCSS } from '@increaser/ui/ui/utils/getVerticalPaddingCSS'

const NotificationsSwitch = styled(Switch)`
  ${getVerticalPaddingCSS(8)}
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
