import { VStack } from '@lib/ui/layout/Stack'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TodayTasksReview = () => {
  return (
    <VStack gap={20}>
      <ShyInfoBlock>
        To pick the right tasks for today, focus on what will have the biggest
        impact on your goals. Prioritize tasks that align with your long-term
        objectives and values. Remember, it's better to accomplish a few
        important tasks well than to be busy with many minor ones. Stay
        disciplined and make choices based on what truly matters.
      </ShyInfoBlock>
      <TasksContainer>
        <ActiveItemIdProvider initialValue={null}>
          <TasksToDo />
        </ActiveItemIdProvider>
      </TasksContainer>
    </VStack>
  )
}
