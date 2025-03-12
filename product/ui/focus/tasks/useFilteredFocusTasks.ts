import { useMemo } from 'react'

import { useFocusProject } from '../state/focusProject'

import { useFocusTasks } from './useFocusTasks'

export const useFilteredFocusTasks = () => {
  const [projectId] = useFocusProject()
  const tasks = useFocusTasks()

  return useMemo(() => {
    if (!projectId) return tasks

    return tasks.filter((task) => task.projectId === projectId)
  }, [projectId, tasks])
}
