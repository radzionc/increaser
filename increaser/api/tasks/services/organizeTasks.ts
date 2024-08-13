import { getUser, updateUser } from '@increaser/db/user'
import { getRecordSize } from '@lib/utils/record/getRecordSize'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

export const organizeTasks = async (userId: string) => {
  const {
    tasks: oldTasks,
    timeZone,
    completedTasksDeletedAt,
    registrationDate,
  } = await getUser(userId, [
    'tasks',
    'timeZone',
    'completedTasksDeletedAt',
    'registrationDate',
  ])

  const now = Date.now()
  const shouldDeleteCompletedTasks =
    (completedTasksDeletedAt ?? registrationDate) <
    inTimeZone(getWeekStartedAt(now), timeZone)

  if (!shouldDeleteCompletedTasks) {
    return
  }

  const tasks = recordFilter(oldTasks, ({ value }) => value.status !== 'done')

  if (getRecordSize(tasks) !== getRecordSize(oldTasks)) {
    await updateUser(userId, {
      tasks,
      completedTasksDeletedAt: now,
    })
  }
}
