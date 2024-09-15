import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getAllUsers, updateUser } from '../user'
import { recordMap } from '@lib/utils/record/recordMap'

const taskStatus = async () => {
  const users = await getAllUsers(['id', 'tasks'])

  await Promise.all(
    users.map((user) => {
      if (isRecordEmpty(user.tasks)) {
        return
      }

      return updateUser(user.id, {
        tasks: recordMap(user.tasks, (task) => ({
          ...task,
          deadlineOrder: task.order,
        })),
      })
    }),
  )
}

taskStatus()
