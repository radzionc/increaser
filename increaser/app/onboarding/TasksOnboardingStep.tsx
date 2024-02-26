import { VStack } from '@lib/ui/layout/Stack'
import { TasksToDo } from '../tasks/components/TasksToDo'

export const TasksOnboardingStep = () => {
  return (
    <VStack gap={40} style={{ maxWidth: 520 }}>
      <TasksToDo />
    </VStack>
  )
}
