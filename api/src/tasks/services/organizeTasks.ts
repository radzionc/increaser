import { getStartOfDayTimestamp } from '../../shared/utils/getStartOfDayTimestamp'
import * as usersDb from '../../users/db'

export const organizeTasks = async (userId: string) => {
  const { tasks: oldTasks, timeZone } = await usersDb.getUserById(userId, [
    'tasks',
    'timeZone',
  ])

  const todayStartedAt = getStartOfDayTimestamp(timeZone)

  const tasks = oldTasks.filter((task) => {
    if (task.startedAt >= todayStartedAt) {
      return true
    }

    return !task.isCompleted
  })

  if (tasks.length !== oldTasks.length) {
    await usersDb.updateUser(userId, {
      tasks,
    })
  }

  return tasks
}
