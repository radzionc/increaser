import { useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import { ScheduledTask } from '@increaser/entities/Task'

export const useUncompleteScheduledTasks = () => {
  const tasks = useTasks()

  return useMemo(() => {
    return tasks.filter(
      (task) => task.deadlineAt && task.status !== 'done',
    ) as ScheduledTask[]
  }, [tasks])
}
