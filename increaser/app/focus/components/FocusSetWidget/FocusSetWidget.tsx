import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { CurrentFocusTask } from '../CurrentFocusTask'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { MinimalisticFocusSet } from '../MinimalisticFocusSet'
import { FocusProjectSelector } from '../FocusProjectSelector'

export const FocusSetWidget = () => {
  return (
    <CurrentFocusGuard>
      <VStack gap={40}>
        <HStack alignItems="center" fullWidth gap={8}>
          <FocusProjectSelector />
          <CurrentFocusTask />
        </HStack>
        <MinimalisticFocusSet />
        <FocusAudioWidget />
      </VStack>
    </CurrentFocusGuard>
  )
}
