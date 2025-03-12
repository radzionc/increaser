import { groupItems } from '@lib/utils/array/groupItems'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { Task, TaskStatus, taskStatuses } from '@product/entities/Task'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import { useMemo } from 'react'

import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { useTasks } from '../hooks/useTasks'

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
