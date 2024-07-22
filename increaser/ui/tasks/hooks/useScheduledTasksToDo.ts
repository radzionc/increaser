import { useMemo } from 'react'
import { useScheduledTasks } from './useScheduledTasks'

export const useScheduledTasksToDo = () => {
  const tasks = useScheduledTasks()

  return useMemo(() => tasks.filter((task) => !task.completedAt), [tasks])
}
