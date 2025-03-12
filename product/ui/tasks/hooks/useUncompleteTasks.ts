import { useMemo } from 'react'

import { useTasks } from './useTasks'

export const useUncompleteTasks = () => {
  const tasks = useTasks()

  return useMemo(() => tasks.filter((task) => task.status !== 'done'), [tasks])
}
