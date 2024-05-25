import { PlanSection } from '../PlanSection'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { TasksManagerProvider } from '@increaser/ui/tasks/TasksManagerProvider'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'

export const TasksReview = () => {
  const hasOverdueTasks = useHasOverdueTasks()
  return (
    <PlanSection
      isCompleted={!hasOverdueTasks}
      title="Review overdue tasks"
      index={2}
    >
      <TasksContainer>
        <TasksManagerProvider>
          <TasksToDo />
        </TasksManagerProvider>
      </TasksContainer>
    </PlanSection>
  )
}
