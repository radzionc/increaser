import { useEffect } from 'react'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useFocusLauncher } from '@increaser/app/focus/launcher/state/FocusLauncherContext'
import { useCurrentFocus } from './CurrentFocusProvider'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const FocusLauncherSynchronizer = () => {
  const { intervals } = useCurrentFocus()

  const { taskId, projectId } = shouldBePresent(getLastItem(intervals))

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
