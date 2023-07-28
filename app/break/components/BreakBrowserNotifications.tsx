import { trackEvent } from 'analytics'
import { useBreak } from 'break/hooks/useBreak'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Switch } from '@increaser/ui/ui/Switch/Switch'
import { getVerticalPaddingCSS } from '@increaser/ui/ui/utils/getVerticalPaddingCSS'

const NotificationsSwitch = styled(Switch)`
  ${getVerticalPaddingCSS(8)}
`

export const BreakBrowserNotification = () => {
  const { hasBrowserNotification, setHasBrowserNotification } = useBreak()

  const handleChange = useCallback(() => {
    if (hasBrowserNotification) {
      setHasBrowserNotification(false)
      return
    }

    window?.Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        trackEvent('Allow browser notifications')
        setHasBrowserNotification(true)
      }
    })
  }, [hasBrowserNotification, setHasBrowserNotification])

  return (
    <NotificationsSwitch
      label="Notifications"
      onChange={handleChange}
      value={hasBrowserNotification}
    />
  )
}
