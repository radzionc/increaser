import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { TaskProject } from '@increaser/ui/tasks/TaskProject'

export const CurrentFocusTask = () => {
  const { taskId } = useCurrentFocus()
  const { tasks } = useAssertUserState()

  const task = Object.values(tasks).find((task) => task.id === taskId)
  if (!task || task.completedAt) {
    return null
  }

  return (
    <CurrentTaskProvider value={task}>
      <div>
        <TaskItemFrame>
          <TaskCheckBox />
          <TaskTextContainer>
            <TaskProject />
            {task.name}
          </TaskTextContainer>
        </TaskItemFrame>
      </div>
    </CurrentTaskProvider>
  )
}
