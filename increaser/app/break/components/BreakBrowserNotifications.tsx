import { analytics } from '@increaser/app/analytics'
import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Switch } from '@lib/ui/inputs/Switch/Switch'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const NotificationsSwitch = styled(Switch)`
  ${verticalPadding(8)}
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
        analytics.trackEvent('Allow browser notifications')
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
