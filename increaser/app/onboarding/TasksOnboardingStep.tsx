import { VStack } from '@lib/ui/layout/Stack'
import { TasksToDo } from '../tasks/components/TasksToDo'
import { TasksDeadlinesOverview } from '../tasks/components/TasksDeadlinesOverview'
import { TasksManagerProvider } from '../tasks/components/TasksManagerProvider'

export const TasksOnboardingStep = () => {
  return (
    <VStack gap={40} style={{ maxWidth: 560 }}>
      <TasksDeadlinesOverview />
      <TasksManagerProvider>
        <TasksToDo />
      </TasksManagerProvider>
    </VStack>
  )
}
