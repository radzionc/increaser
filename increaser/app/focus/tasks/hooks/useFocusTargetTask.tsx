import { useUser } from '@increaser/ui/user/state/user'
import { useFocusTarget } from '../../state/useFocusTarget'

export const useFocusTargetTask = () => {
  const [{ taskId }] = useFocusTarget()
  const { tasks } = useUser()

  return taskId ? tasks[taskId] : null
}
