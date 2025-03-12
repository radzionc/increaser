import { groupItems } from '@lib/utils/array/groupItems'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { recordMap } from '@lib/utils/record/recordMap'
import { toEntries } from '@lib/utils/record/toEntries'
import { Task, TaskStatus, taskStatuses } from '@product/entities/Task'

export const groupTasks = (items: readonly Task[]) =>
  toEntries<TaskStatus, Task[]>({
    ...recordFromKeys(taskStatuses, () => []),
    ...recordMap(
      groupItems<Task, TaskStatus>(Object.values(items), (task) => task.status),
      sortEntitiesWithOrder,
    ),
  })
