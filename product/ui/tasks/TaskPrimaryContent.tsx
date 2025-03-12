import { TaskTextContainer } from '@product/ui/tasks/TaskTextContainer'
import { ComponentProps } from 'react'

import { useCurrentTask } from './CurrentTaskProvider'
import { TaskDeadlineTag } from './deadline/TaskDeadlineTag'
import { TaskProject } from './TaskProject'
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
