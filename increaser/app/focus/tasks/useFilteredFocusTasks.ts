import { useMemo } from 'react'
import { useFocusTasks } from './useFocusTasks'
import { useFocusLauncher } from '../launcher/state/useFocusLauncher'

export const useFilteredFocusTasks = () => {
  const [{ projectId }] = useFocusLauncher()
  const tasks = useFocusTasks()

  return useMemo(() => {
    if (!projectId) return tasks

    return tasks.filter((task) => task.projectId === projectId)
  }, [projectId, tasks])
}
