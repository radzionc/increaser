import { TasksToDo } from '../tasks/components/TasksToDo'
import { TasksDeadlinesOverview } from '../tasks/components/TasksDeadlinesOverview'
import { TasksManagerProvider } from '../tasks/components/TasksManagerProvider'
import { TasksContainer } from '../tasks/components/TasksContainer'

export const TasksOnboardingStep = () => (
  <TasksContainer>
    <TasksDeadlinesOverview />
    <TasksManagerProvider>
      <TasksToDo />
    </TasksManagerProvider>
  </TasksContainer>
)
