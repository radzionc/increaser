import { VStack } from '@lib/ui/css/stack'
import { MinimalisticFocusSet } from './MinimalisticFocusSet'
import { useFocusTask } from '../../tasks/useFocusTask'
import { FocusTaskOverview } from './task/FocusTaskOverview'

export const FocusSetWidget = () => {
  const task = useFocusTask()

  return (
    <VStack gap={40}>
      <MinimalisticFocusSet />
      {task && <FocusTaskOverview />}
    </VStack>
  )
}
