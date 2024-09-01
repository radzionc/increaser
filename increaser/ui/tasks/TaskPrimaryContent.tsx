import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'
import { TaskTrackedTime } from '@increaser/ui/tasks/TaskTrackedTime'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { TaskDeadlineTag } from './deadline/TaskDeadlineTag'

export const TaskPrimaryContent = () => {
  const { name, projectId } = useCurrentTask()

  return (
    <TaskTextContainer>
      <TaskProject value={projectId} />
      <span>{name}</span>
      <TaskTrackedTime />
      <TaskDeadlineTag />
    </TaskTextContainer>
  )
}
