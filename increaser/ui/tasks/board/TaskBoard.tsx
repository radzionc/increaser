import { TaskColumn } from './column/TaskColumn'
import { taskStatuses } from '@increaser/entities/Task'
import { useGroupedByStatusTasks } from '../status/useGroupedByStatusTasks'
import { TaskBoardContainer } from './TaskBoardContainer'

export const TaskBoard = () => {
  const tasks = useGroupedByStatusTasks()

  return (
    <TaskBoardContainer>
      {taskStatuses.map((status) => (
        <TaskColumn key={status} status={status} tasks={tasks[status]} />
      ))}
    </TaskBoardContainer>
  )
}
