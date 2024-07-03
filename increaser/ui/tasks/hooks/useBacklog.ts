import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'
import { UnscheduledTask } from '@increaser/entities/Task'
import { order } from '@lib/utils/array/order'

export const useBacklog = (): UnscheduledTask[] => {
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    const result: UnscheduledTask[] = []
    for (const task of Object.values(tasks)) {
      const { deadlineAt } = task
      if (deadlineAt === null) {
        result.push({
          ...task,
          deadlineAt,
        })
      }
    }

    return order(result, (task) => task.order, 'asc')
  }, [tasks])
}
