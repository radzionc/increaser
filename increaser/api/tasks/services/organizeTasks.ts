import { getUser, updateUser } from '@increaser/db/user'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

export const organizeTasks = async (userId: string) => {
  const { tasks: oldTasks, timeZone } = await getUser(userId, [
    'tasks',
    'timeZone',
  ])

  const weekStartedAt = inTimeZone(getWeekStartedAt(Date.now()), timeZone)

  const tasks = recordFilter(oldTasks, ({ value }) => {
    if (!value.completedAt) return true

    return value.completedAt >= weekStartedAt
  })

  if (tasks.length !== oldTasks.length) {
    await updateUser(userId, {
      tasks,
    })
  }

  return tasks
}
