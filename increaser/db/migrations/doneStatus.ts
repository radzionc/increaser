import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getAllUsers, updateUser } from '../user'
import { recordMap } from '@lib/utils/record/recordMap'
import { Task } from '@increaser/entities/Task'

type OldTask = Task & {
  completedAt?: number
}

const doneStatus = async () => {
  const users = await getAllUsers(['id', 'tasks'])

  await Promise.all(
    users.map((user) => {
      if (isRecordEmpty(user.tasks)) {
        return
      }

      return updateUser(user.id, {
        tasks: recordMap(user.tasks, (task) => ({
          ...task,
          status: (task as OldTask).completedAt ? 'done' : task.status,
        })),
      })
    }),
  )
}

doneStatus()
