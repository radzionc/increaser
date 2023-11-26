import { IconButton } from '@increaser/ui/buttons/IconButton'
import { SettingsIcon } from '@increaser/ui/icons/SettingsIcon'
import { Menu } from '@increaser/ui/menu'

import { ManageAutomation } from './ManageAutomation'
import { ManageBreakNotifications } from './ManageBreakNotifications'

export const BreakSettings = () => {
  return (
    <Menu
      title="Break settings"
      renderContent={() => (
        <>
          <ManageAutomation />
          <ManageBreakNotifications />
        </>
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
