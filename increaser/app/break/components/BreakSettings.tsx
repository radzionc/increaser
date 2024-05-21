import { IconButton } from '@lib/ui/buttons/IconButton'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { Menu } from '@lib/ui/menu'

import { ManageAutomation } from './ManageAutomation'
import { ManageBreakNotifications } from './ManageBreakNotifications'
import { VStack } from '@lib/ui/layout/Stack'

export const BreakSettings = () => {
  return (
    <Menu
      title="Break settings"
      renderContent={() => (
        <VStack gap={12}>
          <ManageAutomation />
          <ManageBreakNotifications />
        </VStack>
      )}
      renderOpener={(props) => (
        <IconButton
          title="Break settings"
          kind="secondary"
          icon={<SettingsIcon />}
          {...props}
        />
      )}
    />
  )
}
