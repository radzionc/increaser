import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'
import { order } from '@lib/utils/array/order'
import { Task } from '@increaser/entities/Task'
import { useProjectFilter } from '../../projects/filter/project/state/projectFilter'

export const useBacklog = () => {
  const { tasks } = useAssertUserState()
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
