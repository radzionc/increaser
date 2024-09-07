import { useMemo } from 'react'
import { useFocusTarget } from '../state/useFocusTarget'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useFocusTargetProject = () => {
  const [{ projectId, taskId }] = useFocusTarget()
  const { projects, tasks } = useAssertUserState()

  return useMemo(() => {
    const id = projectId ?? (taskId ? tasks[taskId].projectId : null)

    return id ? projects[id] : null
  }, [projectId, projects, taskId, tasks])
}
