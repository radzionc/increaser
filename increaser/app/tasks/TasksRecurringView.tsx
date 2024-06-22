import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { RecurringTasks } from '@increaser/ui/taskFactories/RecurringTasks'
import { AddTaskFactory } from '@increaser/ui/taskFactories/AddTaskFactory'
import { VStack } from '@lib/ui/layout/Stack'

export const TasksRecurringView = () => {
  return (
    <>
      <ProductEducationBlock value="recurringTasks" />
      <VStack>
        <RecurringTasks />
        <AddTaskFactory />
      </VStack>
    </>
  )
}
