import { useEffect } from 'react'
import { useFocusProjectId } from '@increaser/ui/focus/utils/useFocusProjectId'
import { useFocusTaskId } from '@increaser/ui/focus/utils/useFocusTaskId'
import { useFocusLauncher } from './state/useFocusLauncher'

export const FocusLauncherSynchronizer = () => {
  const projectId = useFocusProjectId()
  const taskId = useFocusTaskId()

  const [, setState] = useFocusLauncher()
  useEffect(() => {
    setState((state) => ({
      ...state,
      taskId,
      projectId,
      focusEntity: taskId ? 'task' : 'project',
    }))
  }, [projectId, setState, taskId])

  return null
}
