import { useMemo } from 'react'
import { useScheduledTasksToDo } from './hooks/useScheduledTasksToDo'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'

export const useFilteredScheduledTasksToDo = () => {
  const [projectId] = useProjectFilter()
  const items = useScheduledTasksToDo()

  return useMemo(() => {
    if (!projectId) {
      return items
    }

    return items.filter((item) => item.projectId === projectId)
  }, [items, projectId])
}
