import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskItemFrame } from '../../tasks/components/TaskItemFrame'
import { CurrentTaskProvider } from '../../tasks/components/CurrentTaskProvider'
import { TaskCheckBox } from '../../tasks/components/TaskCheckBox'
import { TaskPrimaryContent } from '../../tasks/components/TaskPrimaryContent'

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
          <TaskPrimaryContent />
        </TaskItemFrame>
      </div>
    </CurrentTaskProvider>
  )
}
