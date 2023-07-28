import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { HStack, VStack } from '@increaser/ui/ui/Stack'

import { FocusBrowserNotification } from '../FocusSettings/FocusBrowserNotification'
import { SoundToggle } from 'ui/SoundToggle'

const Container = styled(HStack)`
  position: relative;
`

const SoundsNotifications = styled.div`
  position: absolute;
  right: -42px;
`

export const FocusAssistance = () => {
  const {
    hasTimerSoundNotification,
    setHasTimerSoundNotification,
    hasTimerBrowserNotification,
  } = useFocus()

  return (
    <VStack alignItems="center">
      <Container alignItems="center" gap={16}>
        <FocusBrowserNotification />
        {hasTimerBrowserNotification && (
          <SoundsNotifications>
            <SoundToggle
              value={hasTimerSoundNotification}
              onChange={setHasTimerSoundNotification}
            />
          </SoundsNotifications>
        )}
      </Container>
    </VStack>
  )
}
