import { useMemo } from 'react'
import { useProjectFilter } from '../projects/filter/useProjectFilter'
import { useScheduledTasksToDo } from './hooks/useScheduledTasksToDo'

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
