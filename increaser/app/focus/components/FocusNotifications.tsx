import { HStack, VStack } from '@lib/ui/css/stack'

import { FocusBrowserNotification } from './FocusSettings/FocusBrowserNotification'
import { Menu } from '@lib/ui/menu'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { Button } from '@lib/ui/buttons/Button'
import { Text } from '@lib/ui/text'
import { FocusSoundNotifications } from './FocusSoundNotifications'

const title = 'Notifications settings'

export const FocusNotifications = () => {
  return (
    <Menu
      title={title}
      renderContent={() => (
        <VStack gap={12}>
          <FocusBrowserNotification />
          <FocusSoundNotifications />
        </VStack>
      )}
      renderOpener={({ props }) => (
        <div {...props}>
          <Button kind="ghostSecondary" size="xs">
            <HStack alignItems="center" gap={4}>
              <SettingsIcon />
              <Text>Notifications</Text>
            </HStack>
          </Button>
        </div>
      )}
    />
  )
}
