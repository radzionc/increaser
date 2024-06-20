import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TasksOnboardingStep = () => (
  <TasksContainer>
    <ActiveItemIdProvider initialValue={null}>
      <TasksToDo />
    </ActiveItemIdProvider>
  </TasksContainer>
)
