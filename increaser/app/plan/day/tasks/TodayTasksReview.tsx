import { VStack } from '@lib/ui/layout/Stack'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { Tasks } from '@increaser/ui/tasks/Tasks'

export const TodayTasksReview = () => {
  return (
    <VStack gap={20}>
      <ProductEducationBlock value="todayTasks" />
      <Tasks />
    </VStack>
  )
}
