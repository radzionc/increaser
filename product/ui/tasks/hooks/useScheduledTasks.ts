import { ScheduledTask } from '@product/entities/Task'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useScheduledTasks = (): ScheduledTask[] => {
  const { tasks } = useUser()

  return useMemo(() => {
    const result: ScheduledTask[] = []
    for (const task of Object.values(tasks)) {
      const { deadlineAt } = task
      if (deadlineAt !== null) {
        result.push({
          ...task,
          deadlineAt,
        })
      }
    }

    return result
  }, [tasks])
}
