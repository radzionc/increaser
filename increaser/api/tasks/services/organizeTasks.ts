import { getUser, updateUser } from '@increaser/db/user'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { startOfDay } from 'date-fns'

export const organizeTasks = async (userId: string) => {
  const { tasks: oldTasks, timeZone } = await getUser(userId, [
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
    await updateUser(userId, {
      tasks,
    })
  }

  return tasks
}
