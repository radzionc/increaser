import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksDeadlinesOverview } from '@increaser/ui/tasks/TasksDeadlinesOverview'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TasksOnboardingStep = () => (
  <TasksContainer>
    <TasksDeadlinesOverview />
    <ActiveItemIdProvider initialValue={null}>
      <TasksToDo />
    </ActiveItemIdProvider>
  </TasksContainer>
)
