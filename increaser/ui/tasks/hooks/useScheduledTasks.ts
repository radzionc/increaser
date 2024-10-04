import { useUser } from '@increaser/ui/user/state/user'
import { useMemo } from 'react'
import { ScheduledTask } from '@increaser/entities/Task'

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
