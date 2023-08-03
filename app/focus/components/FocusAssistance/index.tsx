import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'

import { FocusBrowserNotification } from '../FocusSettings/FocusBrowserNotification'
import { Menu } from '@increaser/ui/ui/Menu'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { SettingsIcon } from '@increaser/ui/ui/icons/SettingsIcon'
import { ShySoundToggle } from '@increaser/ui/ui/ShySoundToggle'

const Container = styled(HStack)`
  position: relative;
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
          <ShySoundToggle
            value={hasTimerSoundNotification}
            style={{ opacity: Number(hasTimerBrowserNotification) }}
            onChange={setHasTimerSoundNotification}
          />
        </Container>
      )}
      renderOpener={(props) => (
        <IconButton kind="secondary" icon={<SettingsIcon />} {...props} />
      )}
    />
  )
}
