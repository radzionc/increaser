import { Match } from '@lib/ui/base/Match'
import { useTasksView } from './view/useTasksView'
import { TaskBoard } from './board/TaskBoard'
import { ScheduledTasksView } from './scheduled/ScheduledTasksView'

export const Tasks = () => {
  const [view] = useTasksView()

  return (
    <Match
      value={view}
      board={() => <TaskBoard />}
      upcoming={() => <ScheduledTasksView />}
    />
  )
}
