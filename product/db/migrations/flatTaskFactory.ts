import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { recordMap } from '@lib/utils/record/recordMap'
import { Task } from '@product/entities/Task'
import { TaskCadence } from '@product/entities/TaskFactory'

import { getAllUsers, updateUser } from '../user'

type OldTaskFactory = EntityWithId & {
  task: Pick<Task, 'name' | 'description' | 'projectId' | 'links' | 'checklist'>
  cadence: TaskCadence
  // day cadence: none
  // workday cadence: none
  // week cadence: 0-6
  // month cadence: 0-30
  deadlineIndex?: number | null
  lastOutputAt?: number
}

const taskStatus = async () => {
  const users = await getAllUsers(['id', 'taskFactories'])

  await Promise.all(
    users.map(({ id, taskFactories }) => {
      const oldTaskFactories = taskFactories as any as Record<
        string,
        OldTaskFactory
      >
      if (isRecordEmpty(oldTaskFactories)) {
        return
      }

      return updateUser(id, {
        taskFactories: recordMap(oldTaskFactories, ({ task, ...rest }) => ({
          ...rest,
          ...task,
        })),
      })
    }),
  )
}

taskStatus()
