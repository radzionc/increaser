import { Panel } from '@lib/ui/panel/Panel'
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
      <Panel kind="secondary">
        <TasksContainer style={{ paddingLeft: 20 }}>
          <TasksManagerProvider>
            <TasksToDo />
          </TasksManagerProvider>
        </TasksContainer>
      </Panel>
    </PlanSection>
  )
}
