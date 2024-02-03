import { getUser, updateUser } from '@increaser/db/user'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

export const organizeTasks = async (userId: string) => {
  const { tasks: oldTasks, timeZone } = await getUser(userId, [
    'tasks',
    'timeZone',
  ])

  const weekStartedAt = inTimeZone(getWeekStartedAt(Date.now()), timeZone)

  const tasks = oldTasks.filter((task) => {
    if (!task.completedAt) return true

    return task.completedAt >= weekStartedAt
  })

  if (tasks.length !== oldTasks.length) {
    await updateUser(userId, {
      tasks,
    })
  }

  return tasks
}
