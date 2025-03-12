import { order } from '@lib/utils/array/order'
import { Task } from '@product/entities/Task'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

import { useProjectFilter } from '../../projects/filter/project/state/projectFilter'

export const useBacklog = () => {
  const { tasks } = useUser()
  const [projectId] = useProjectFilter()

  return useMemo(() => {
    const result: Task[] = []
    Object.values(tasks).forEach((task) => {
      if (projectId && task.projectId !== projectId) {
        return
      }

      if (task.status === 'backlog') {
        result.push(task)
      }
    })

    return order(result, (task) => task.order, 'asc')
  }, [projectId, tasks])
}
