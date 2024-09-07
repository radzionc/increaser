import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useFocusTarget } from '../../state/useFocusTarget'

export const useFocusTargetTask = () => {
  const [{ taskId }] = useFocusTarget()
  const { tasks } = useAssertUserState()

  return taskId ? tasks[taskId] : null
}
