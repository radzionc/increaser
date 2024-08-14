import { Match } from '@lib/ui/base/Match'
import { useTaskStatusFilter } from './status/TaskStatusFilter'
import { TasksBacklogView } from './TasksBacklogView'
import { TasksDone } from './TasksDone'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ScheduledTasks } from './scheduled/ScheduledTasks'

export const TasksContent = () => {
  const [status] = useTaskStatusFilter()

  return (
    <Match
      value={status}
      done={() => <TasksDone />}
      todo={() => (
        <ActiveItemIdProvider initialValue={null}>
          <ScheduledTasks />
        </ActiveItemIdProvider>
      )}
      backlog={() => <TasksBacklogView />}
    />
  )
}
