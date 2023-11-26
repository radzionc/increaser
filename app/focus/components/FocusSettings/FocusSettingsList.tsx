import { VStack } from '@increaser/ui/layout/Stack'

import { FocusBrowserNotification } from './FocusBrowserNotification'
import { FocusSoundNotification } from './FocusSoundNotification'

export const FocusSettingsList = () => {
  return (
    <VStack gap={20}>
      <FocusBrowserNotification />
      <FocusSoundNotification />
    </VStack>
  )
}
