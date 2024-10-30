import { useMemo } from 'react'
import { useFocusTasks } from './useFocusTasks'
import { useFocusProject } from '../state/focusProject'

export const useFilteredFocusTasks = () => {
  const [projectId] = useFocusProject()
  const tasks = useFocusTasks()

  return useMemo(() => {
    if (!projectId) return tasks

    return tasks.filter((task) => task.projectId === projectId)
  }, [projectId, tasks])
}
