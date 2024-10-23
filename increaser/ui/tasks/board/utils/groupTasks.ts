import { Task, TaskStatus, taskStatuses } from '@increaser/entities/Task'
import { groupItems } from '@lib/utils/array/groupItems'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { recordMap } from '@lib/utils/record/recordMap'
import { toEntries } from '@lib/utils/record/toEntries'

export const groupTasks = (items: Task[]) =>
  toEntries<TaskStatus, Task[]>({
    ...recordFromKeys(taskStatuses, () => []),
    ...recordMap(
      groupItems<Task, TaskStatus>(Object.values(items), (task) => task.status),
      sortEntitiesWithOrder,
    ),
  })
