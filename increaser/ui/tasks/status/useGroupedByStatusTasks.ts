import { useMemo } from 'react'
import { groupItems } from '@lib/utils/array/groupItems'
import { Task, TaskStatus, taskStatuses } from '@increaser/entities/Task'
import { useTasks } from '../hooks/useTasks'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'

export const useGroupedByStatusTasks = () => {
  const tasks = useFilterByProject(useTasks(), getProjectId)

  return useMemo(() => {
    return {
      ...recordFromKeys(taskStatuses, () => []),
      ...groupItems<Task, TaskStatus>(
        Object.values(tasks),
        (task) => task.status,
      ),
    }
  }, [tasks])
}
