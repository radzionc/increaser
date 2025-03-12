import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

import { useFocusTarget } from '../state/focusTarget'

export const useFocusTargetProject = () => {
  const { projectId, taskId } = useFocusTarget()
  const { projects, tasks } = useUser()

  return useMemo(() => {
    const id = projectId ?? (taskId ? tasks[taskId].projectId : null)

    return id ? projects[id] : null
  }, [projectId, projects, taskId, tasks])
}
