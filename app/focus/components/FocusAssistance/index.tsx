import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'

import { FocusBrowserNotification } from '../FocusSettings/FocusBrowserNotification'
import { SoundToggle } from 'ui/SoundToggle'
import { Menu } from '@increaser/ui/ui/Menu'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { SettingsIcon } from '@increaser/ui/ui/icons/SettingsIcon'

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
    <Menu
      title="Focus settings"
      renderContent={() => (
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
      )}
      renderOpener={(props) => (
        <IconButton kind="secondary" icon={<SettingsIcon />} {...props} />
      )}
    />
  )
}
