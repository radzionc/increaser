import { useCurrentTask } from './CurrentTaskProvider'
import { TaskProject } from './TaskProject'
import { TaskTrackedTime } from './TaskTrackedTime'
import { TaskTextContainer } from './TaskTextContainer'

export const TaskPrimaryContent = () => {
  const { name } = useCurrentTask()

  return (
    <TaskTextContainer>
      <TaskProject />
      <TaskTrackedTime />
      {name}
    </TaskTextContainer>
  )
}
