import { useMemo } from 'react'
import { groupItems } from '@lib/utils/array/groupItems'
import { Task, TaskStatus, taskStatuses } from '@increaser/entities/Task'
import { useTasks } from '../hooks/useTasks'
import { useFilterByProject } from '../../projects/filter/useFilterByProject'
import { makeRecord } from '@lib/utils/record/makeRecord'

export const useGroupedByStatusTasks = () => {
  const tasks = useFilterByProject(useTasks(), (task) => task.projectId)

  return useMemo(() => {
    return {
      ...makeRecord(taskStatuses, () => []),
      ...groupItems<Task, TaskStatus>(
        Object.values(tasks),
        (task) => task.status,
      ),
    }
  }, [tasks])
}
