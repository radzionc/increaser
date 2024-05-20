import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentFocusTask } from '../CurrentFocusTask'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { MinimalisticFocusSet } from '../MinimalisticFocusSet'

export const FocusSetWidget = () => {
  return (
    <CurrentFocusGuard>
      <VStack gap={40}>
        <CurrentFocusTask />
        <MinimalisticFocusSet />
        <FocusAudioWidget />
      </VStack>
    </CurrentFocusGuard>
  )
}
