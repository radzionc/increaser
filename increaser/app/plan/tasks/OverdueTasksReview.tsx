import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { Panel } from '@lib/ui/panel/Panel'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { Text } from '@lib/ui/text'
import { OverdueTasks } from './OverdueTasks'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const OverdueTasksReview = () => {
  const hasOverdueTasks = useHasOverdueTasks()

  return (
    <>
      {hasOverdueTasks ? (
        <TasksContainer>
          <ActiveItemIdProvider initialValue={null}>
            <OverdueTasks />
          </ActiveItemIdProvider>
        </TasksContainer>
      ) : (
        <Panel>
          <Text size={14} color="contrast" height="large" weight="semibold">
            <EmojiTextPrefix emoji="🎉" />
            All caught up! No overdue tasks to worry about today.
          </Text>
        </Panel>
      )}
    </>
  )
}
