import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'
import { TaskTrackedTime } from '@increaser/ui/tasks/TaskTrackedTime'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { TaskDeadlineTag } from './deadline/TaskDeadlineTag'
import { ComponentProps } from 'react'

export const TaskPrimaryContent = (
  props: ComponentProps<typeof TaskTextContainer>,
) => {
  const { name, projectId } = useCurrentTask()

  return (
    <TaskTextContainer {...props}>
      <TaskProject value={projectId} />
      <span>{name}</span>
      <TaskTrackedTime />
      <TaskDeadlineTag />
    </TaskTextContainer>
  )
}
