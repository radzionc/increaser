import { Match } from '@lib/ui/base/Match'
import { useTaskStatusFilter } from './status/TaskStatusFilter'
import { TasksBacklogView } from './TasksBacklogView'
import { TasksDone } from './TasksDone'
import { TasksToDoView } from './TasksToDoView'

export const TasksContent = () => {
  const [status] = useTaskStatusFilter()

  return (
    <Match
      value={status}
      done={() => <TasksDone />}
      todo={() => <TasksToDoView />}
      backlog={() => <TasksBacklogView />}
    />
  )
}
