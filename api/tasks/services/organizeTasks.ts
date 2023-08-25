import { inTimeZone } from '@increaser/utils/inTimeZone'
import * as usersDb from '../../users/db'
import { startOfDay } from 'date-fns'

export const organizeTasks = async (userId: string) => {
  const { tasks: oldTasks, timeZone } = await usersDb.getUserById(userId, [
    'tasks',
    'timeZone',
  ])

  const todayStartedAt = inTimeZone(startOfDay(Date.now()).getTime(), timeZone)

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
