import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { TaskDeadlineTag } from './deadline/TaskDeadlineTag'
import { ComponentProps } from 'react'
import { TaskTrackedTime } from './trackedTime/TaskTrackedTime'

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
