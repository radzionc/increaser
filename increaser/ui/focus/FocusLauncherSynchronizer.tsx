import { useEffect } from 'react'
import { useFocus } from './FocusContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useFocusLauncher } from '@increaser/app/focus/launcher/state/FocusLauncherContext'

export const FocusLauncherSynchronizer = () => {
  const { currentSet: potentialCurrentSet } = useFocus()
  const currentSet = shouldBePresent(potentialCurrentSet)

  const { setState } = useFocusLauncher()
  const taskId = currentSet.task?.id || null
  const projectId = currentSet.projectId
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
