import { VStack } from '@lib/ui/layout/Stack'
import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'

export const TodayTasksReview = () => {
  return (
    <VStack gap={20}>
      <ProductEducationBlock value="todayTasks" />
      <TasksContainer>
        <ActiveItemIdProvider initialValue={null}>
          <TasksToDo />
        </ActiveItemIdProvider>
      </TasksContainer>
    </VStack>
  )
}
