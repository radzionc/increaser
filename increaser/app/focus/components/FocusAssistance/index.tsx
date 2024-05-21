import { HStack } from '@lib/ui/layout/Stack'

import { FocusBrowserNotification } from '../FocusSettings/FocusBrowserNotification'
import { FocusSoundNotifications } from '@lib/ui/notifications/components/ShySoundToggle'
import { LabeledValue } from '@lib/ui/text/LabeledValue'

export const FocusNotifications = () => {
  return (
    <LabeledValue name="Notifications">
      <HStack alignItems="center" gap={8}>
        <FocusBrowserNotification />
        <FocusSoundNotifications />
      </HStack>
    </LabeledValue>
  )
}
