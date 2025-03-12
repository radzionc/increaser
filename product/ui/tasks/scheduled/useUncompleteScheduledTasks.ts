import { ScheduledTask } from '@product/entities/Task'
import { useMemo } from 'react'

import { useTasks } from '../hooks/useTasks'

export const useUncompleteScheduledTasks = () => {
  const tasks = useTasks()

  return useMemo(() => {
    return tasks.filter(
      (task) => task.deadlineAt && task.status !== 'done',
    ) as ScheduledTask[]
  }, [tasks])
}
