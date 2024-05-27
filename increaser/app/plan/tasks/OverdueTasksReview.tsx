import { PlanSection } from '../PlanSection'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { TasksManagerProvider } from '@increaser/ui/tasks/TasksManagerProvider'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { Panel } from '@lib/ui/panel/Panel'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { Text } from '@lib/ui/text'
import { OverdueTasks } from './OverdueTasks'

export const OverdueTasksReview = () => {
  const hasOverdueTasks = useHasOverdueTasks()

  return (
    <PlanSection
      isCompleted={!hasOverdueTasks}
      title="Review overdue tasks"
      index={2}
    >
      {hasOverdueTasks ? (
        <TasksContainer>
          <TasksManagerProvider>
            <OverdueTasks />
          </TasksManagerProvider>
        </TasksContainer>
      ) : (
        <Panel>
          <Text size={14} color="contrast" height="large" weight="semibold">
            <EmojiTextPrefix emoji="🎉" />
            All caught up! No overdue tasks to worry about today.
          </Text>
        </Panel>
      )}
    </PlanSection>
  )
}
