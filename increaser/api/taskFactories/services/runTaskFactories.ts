import { getUser, updateUser } from '@increaser/db/user'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getCadencePeriodStart'
import { Task } from '@increaser/entities/Task'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { toRecord } from '@lib/utils/record/toRecord'
import { recordMap } from '@lib/utils/record/recordMap'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { endOfDay, endOfMonth, getDaysInMonth } from 'date-fns'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'

export const runTaskFactories = async (userId: string) => {
  const { taskFactories, timeZone, tasks } = await getUser(userId, [
    'taskFactories',
    'timeZone',
    'tasks',
  ])

  const oldTasks = Object.values(tasks)
  const generatedTasks: Task[] = []

  Object.values(taskFactories).forEach(
    ({ task, cadence, lastOutputAt, id, deadlineIndex }) => {
      const cadencePeriodStart = inTimeZone(
        getCadencePeriodStart(cadence),
        timeZone,
      )
      if (lastOutputAt && lastOutputAt >= cadencePeriodStart) return

      const now = Date.now()
      const deadlineAt = inTimeZone(
        match(cadence, {
          workday: () => endOfDay(now).getTime(),
          day: () => endOfDay(now).getTime(),
          week: () =>
            getWeekEndedAt(now) -
            convertDuration(6 - (deadlineIndex ?? 0), 'd', 'ms'),
          month: () => {
            const daysInMonth = getDaysInMonth(now)
            return (
              endOfMonth(now).getTime() -
              convertDuration(
                daysInMonth - 1 - Math.min(deadlineIndex ?? 0, daysInMonth - 1),
                'd',
                'ms',
              )
            )
          },
        }),
        timeZone,
      )

      const newTasks = [...oldTasks, ...generatedTasks]

      const orders = newTasks
        .filter((task) => task.deadlineAt === deadlineAt)
        .map((task) => task.order)

      const order = getLastItemOrder(orders)

      generatedTasks.push({
        startedAt: now,
        id: getId(),
        deadlineAt,
        order,
        factoryId: id,
        ...task,
      })
    },
  )

  if (generatedTasks.length > 0) {
    const newTasks = toRecord(
      [...oldTasks, ...generatedTasks],
      (task) => task.id,
    )

    const newTaskFactories = recordMap(taskFactories, (taskFactory) => {
      if (generatedTasks.some((task) => task.factoryId === taskFactory.id)) {
        return {
          ...taskFactory,
          lastOutputAt: Date.now(),
        }
      }

      return taskFactory
    })

    await updateUser(userId, {
      tasks: newTasks,
      taskFactories: newTaskFactories,
    })
  }
}
