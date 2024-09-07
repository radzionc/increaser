import { VStack } from '@lib/ui/css/stack'
import { MinimalisticFocusSet } from './MinimalisticFocusSet'
import { FocusTaskOverview } from './task/FocusTaskOverview'
import { useFocusTargetTask } from '../../tasks/hooks/useFocusTargetTask'

export const FocusSetWidget = () => {
  const task = useFocusTargetTask()

  return (
    <VStack gap={40}>
      <MinimalisticFocusSet />
      {task && <FocusTaskOverview />}
    </VStack>
  )
}
