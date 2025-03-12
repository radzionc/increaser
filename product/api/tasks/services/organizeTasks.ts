import { getRecordSize } from '@lib/utils/record/getRecordSize'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getUser, updateUser } from '@product/db/user'
import { startOfISOWeek } from 'date-fns'

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
    inTimeZone(startOfISOWeek(now).getTime(), timeZone)

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
