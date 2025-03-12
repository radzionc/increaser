import { useMemo } from 'react'

import { useTasks } from './hooks/useTasks'

export const useUncompleteTasks = () => {
  const tasks = useTasks()

  return useMemo(() => {
    return tasks.filter((task) => task.status !== 'done')
  }, [tasks])
}
