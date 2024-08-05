import { useEffect } from 'react'
import { useFocusLauncher } from '@increaser/app/focus/launcher/state/FocusLauncherContext'
import { useFocusProjectId } from '@increaser/ui/focus/utils/useFocusProjectId'
import { useFocusTaskId } from '@increaser/ui/focus/utils/useFocusTaskId'

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
