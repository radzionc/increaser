import { getUser, updateUser } from '@increaser/db/user'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getCadencePeriodStart } from '@increaser/entities-utils/task/getCadencePeriodStart'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { DeadlineType } from '@increaser/entities/Task'
import { match } from '@lib/utils/match'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { getRecord } from '@lib/utils/record/getRecord'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

export const runTaskFactories = async (userId: string) => {
  const { taskFactories, timeZone, tasks } = await getUser(userId, [
    'taskFactories',
    'timeZone',
    'tasks',
  ])

  const newTasks = Object.values(tasks)

  Object.values(taskFactories).forEach(
    ({ task, cadence, lastOutputAt, id }) => {
      const cadencePeriodStart = inTimeZone(
        getCadencePeriodStart({ cadence, timeZone }),
        timeZone,
      )
      if (lastOutputAt >= cadencePeriodStart) return

      const now = Date.now()
      const deadlineType: DeadlineType = match(cadence, {
        week: () => 'thisWeek',
        day: () => 'today',
        workday: () => 'today',
      })
      const deadlineAt = inTimeZone(
        getDeadlineAt({ deadlineType, now }),
        timeZone,
      )

      const orders = newTasks
        .filter((task) => task.deadlineAt === deadlineAt)
        .map((task) => task.order)

      const order = getLastItemOrder(orders)

      newTasks.push({
        startedAt: now,
        id: getId(),
        name: task.name,
        projectId: task.projectId,
        deadlineAt,
        order,
        links: task.links,
        factoryId: id,
      })
    },
  )

  if (newTasks.length !== Object.values(tasks).length) {
    await updateUser(userId, {
      tasks: getRecord(newTasks, (task) => task.id),
    })
  }
}
