import { useMemo } from 'react'
import { useTodayTasks } from './useTodayTasks'

export const useTodayIncompleteTasks = () => {
  const tasks = useTodayTasks()

  return useMemo(() => tasks.filter(({ completedAt }) => !completedAt), [tasks])
}
