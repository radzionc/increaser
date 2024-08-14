import { Task, TaskStatus, taskStatusName } from '@increaser/entities/Task'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from '../../CurrentTaskProvider'
import { TaskItem } from '../item/TaskItem'
import { ColumnContent, ColumnHeader } from './ColumnHeader'
import { AddTask } from './AddTask'
import { ColumnFooter } from './ColumnFooter'
import { TaskColumnContent } from './TaskColumnContent'
import { TaskColumnContainer } from './TaskColumnContainer'

type TaskColumnProps = {
  tasks: Task[]
  status: TaskStatus
}

export const TaskColumn = ({ tasks, status }: TaskColumnProps) => {
  return (
    <TaskColumnContainer>
      <ColumnHeader>
        <ColumnContent>
          <Text weight="600">{taskStatusName[status]}</Text>
        </ColumnContent>
      </ColumnHeader>
      <TaskColumnContent>
        {tasks.map((task) => (
          <CurrentTaskProvider key={task.id} value={task}>
            <TaskItem />
          </CurrentTaskProvider>
        ))}
      </TaskColumnContent>
      <ColumnFooter>
        <AddTask status={status} />
      </ColumnFooter>
    </TaskColumnContainer>
  )
}
