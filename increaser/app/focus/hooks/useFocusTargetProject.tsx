import { useMemo } from 'react'
import { useFocusTarget } from '../state/useFocusTarget'
import { useUser } from '@increaser/ui/user/state/user'

export const useFocusTargetProject = () => {
  const [{ projectId, taskId }] = useFocusTarget()
  const { projects, tasks } = useUser()

  return useMemo(() => {
    const id = projectId ?? (taskId ? tasks[taskId].projectId : null)

    return id ? projects[id] : null
  }, [projectId, projects, taskId, tasks])
}
