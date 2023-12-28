import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'

import { FocusBrowserNotification } from '../FocusSettings/FocusBrowserNotification'
import { Menu } from '@lib/ui/menu'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { ShySoundToggle } from '@lib/ui/notifications/components/ShySoundToggle'

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
        <IconButton
          title="Focus settings"
          kind="secondary"
          icon={<SettingsIcon />}
          {...props}
        />
      )}
    />
  )
}
