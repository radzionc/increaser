import { useMemo } from 'react'
import { useFocusTasks } from './useFocusTasks'
import { useFocusTarget } from '../state/useFocusTarget'

export const useFilteredFocusTasks = () => {
  const [{ projectId }] = useFocusTarget()
  const tasks = useFocusTasks()

  return useMemo(() => {
    if (!projectId) return tasks

    return tasks.filter((task) => task.projectId === projectId)
  }, [projectId, tasks])
}
