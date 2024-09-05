import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const useFocusTask = () => {
  const { intervals } = useCurrentFocus()
  const { tasks } = useAssertUserState()

  const { taskId } = getLastItem(intervals)

  return taskId ? tasks[taskId] : null
}
