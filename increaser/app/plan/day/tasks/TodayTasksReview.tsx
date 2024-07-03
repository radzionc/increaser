import { VStack } from '@lib/ui/layout/Stack'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { TasksView } from '../../../tasks/TasksView'

export const TodayTasksReview = () => {
  return (
    <VStack gap={20}>
      <ProductEducationBlock value="todayTasks" />
      <TasksView />
    </VStack>
  )
}
