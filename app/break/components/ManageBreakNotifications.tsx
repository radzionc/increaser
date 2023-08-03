import { useBreak } from 'break/hooks/useBreak'
import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'

import { BreakBrowserNotification } from './BreakBrowserNotifications'
import { ShySoundToggle } from '@increaser/ui/ui/ShySoundToggle'

const Container = styled(HStack)`
  position: relative;
`

export const ManageBreakNotifications = () => {
  const {
    hasBrowserNotification,
    setHasSoundNotification,
    hasSoundNotification,
  } = useBreak()

  return (
    <Container alignItems="center" gap={16}>
      <BreakBrowserNotification />
      <ShySoundToggle
        value={hasSoundNotification}
        style={{ opacity: Number(hasBrowserNotification) }}
        onChange={setHasSoundNotification}
      />
    </Container>
  )
}
