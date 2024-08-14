import { useMemo } from 'react'
import { groupItems } from '@lib/utils/array/groupItems'
import { Task, TaskStatus } from '@increaser/entities/Task'
import { useAssertUserState } from '../../user/UserStateContext'

export const useGroupedByStatusTasks = () => {
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    return groupItems<Task, TaskStatus>(
      Object.values(tasks),
      (task) => task.status,
    )
  }, [tasks])
}
