import { VStack } from '@lib/ui/layout/Stack'
import { TasksToDo } from '../tasks/components/TasksToDo'
import { TasksDeadlinesOverview } from '../tasks/components/TasksDeadlinesOverview'

export const TasksOnboardingStep = () => {
  return (
    <VStack gap={40} style={{ maxWidth: 520 }}>
      <TasksDeadlinesOverview />
      <TasksToDo />
    </VStack>
  )
}
