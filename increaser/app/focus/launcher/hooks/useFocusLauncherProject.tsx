import { useMemo } from 'react'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useFocusLauncherProject = () => {
  const [{ projectId, taskId }] = useFocusLauncher()
  const { projects, tasks } = useAssertUserState()

  return useMemo(() => {
    const id = projectId ?? (taskId ? tasks[taskId].projectId : null)

    return id ? projects[id] : null
  }, [projectId, projects, taskId, tasks])
}
