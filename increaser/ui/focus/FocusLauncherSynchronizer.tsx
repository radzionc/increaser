import { useEffect } from 'react'
import { useFocusLauncher } from '@increaser/app/focus/launcher/state/FocusLauncherContext'
import { useFocusProjectId } from './utils/useFocusProjectId'
import { useFocusTaskId } from './utils/useFocusTaskId'

export const FocusLauncherSynchronizer = () => {
  const projectId = useFocusProjectId()
  const taskId = useFocusTaskId()

  const { setState } = useFocusLauncher()
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
