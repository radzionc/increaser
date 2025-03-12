import { useUser } from '@product/ui/user/state/user'

import { useFocusTarget } from '../../state/focusTarget'

export const useFocusTargetTask = () => {
  const { taskId } = useFocusTarget()
  const { tasks } = useUser()

  return taskId ? tasks[taskId] : null
}
