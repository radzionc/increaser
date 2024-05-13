import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksDeadlinesOverview } from '@increaser/ui/tasks/TasksDeadlinesOverview'
import { TasksManagerProvider } from '@increaser/ui/tasks/TasksManagerProvider'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'

export const TasksOnboardingStep = () => (
  <TasksContainer>
    <TasksDeadlinesOverview />
    <TasksManagerProvider>
      <TasksToDo />
    </TasksManagerProvider>
  </TasksContainer>
)
