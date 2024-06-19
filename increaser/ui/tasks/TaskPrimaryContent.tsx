import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'
import { TaskTrackedTime } from '@increaser/ui/tasks/TaskTrackedTime'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'

export const TaskPrimaryContent = () => {
  const { name, projectId } = useCurrentTask()

  return (
    <TaskTextContainer>
      <TaskProject value={projectId} />
      <TaskTrackedTime />
      {name}
    </TaskTextContainer>
  )
}
