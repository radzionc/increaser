import { useMemo } from 'react'
import { useScheduledTasksToDo } from './hooks/useScheduledTasksToDo'
import { useTasksFilter } from './filter/TasksFilterProvider'

export const useFilteredScheduledTasksToDo = () => {
  const [{ projectId }] = useTasksFilter()
  const items = useScheduledTasksToDo()

  return useMemo(() => {
    if (!projectId) {
      return items
    }

    return items.filter((item) => item.projectId === projectId)
  }, [items, projectId])
}
