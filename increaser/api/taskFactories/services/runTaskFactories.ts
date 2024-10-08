import { getUser, updateUser } from '@increaser/db/user'
import { getCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getCadencePeriodStart'
import { Task } from '@increaser/entities/Task'
import { toRecord } from '@lib/utils/record/toRecord'
import { recordMap } from '@lib/utils/record/recordMap'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getRecurringTaskDeadline } from '@increaser/entities-utils/taskFactory/getRecurringTaskDeadline'
import { generateTask } from '@increaser/entities-utils/taskFactory/generateTask'

export const runTaskFactories = async (userId: string) => {
  const { taskFactories, timeZone, tasks } = await getUser(userId, [
    'taskFactories',
    'timeZone',
    'tasks',
  ])

  const oldTasks = Object.values(tasks)
  const generatedTasks: Task[] = []

  Object.values(taskFactories).forEach(
    ({ cadence, lastOutputAt, id, deadlineIndex, ...task }) => {
      const cadencePeriodStart = inTimeZone(
        getCadencePeriodStart({
          cadence,
          at: Date.now(),
        }),
        timeZone,
      )
      if (lastOutputAt && lastOutputAt >= cadencePeriodStart) return

      const now = Date.now()
      const unadjustedDeadlineAt = getRecurringTaskDeadline({
        cadence,
        deadlineIndex,
        at: now,
      })

      if (unadjustedDeadlineAt < now) return

      const deadlineAt = inTimeZone(unadjustedDeadlineAt, timeZone)

      const newTasks = [...oldTasks, ...generatedTasks]

      const newTask = generateTask({
        task: {
          ...task,
          cadence,
          deadlineIndex,
          willBeCreatedAt: cadencePeriodStart,
          factoryId: id,
        },
        tasks: newTasks,
      })

      generatedTasks.push({
        ...newTask,
        deadlineAt,
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
