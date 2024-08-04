import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'
import { UnscheduledTask } from '@increaser/entities/Task'
import { order } from '@lib/utils/array/order'
import { useProjectFilter } from '../../projects/filter/ProjectFilterProvider'

export const useBacklog = (): UnscheduledTask[] => {
  const { tasks } = useAssertUserState()
  const [projectId] = useProjectFilter()

  return useMemo(() => {
    const result: UnscheduledTask[] = []
    Object.values(tasks).forEach((task) => {
      const { deadlineAt } = task
      if (projectId && task.projectId !== projectId) {
        return
      }
      if (task.completedAt) {
        return
      }
      if (deadlineAt === null) {
        result.push({
          ...task,
          deadlineAt,
        })
      }
    })

    return order(result, (task) => task.order, 'asc')
  }, [projectId, tasks])
}
