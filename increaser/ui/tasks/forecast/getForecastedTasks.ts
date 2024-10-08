import { getCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getCadencePeriodStart'
import { getRecurringTaskDeadline } from '@increaser/entities-utils/taskFactory/getRecurringTaskDeadline'
import { ForecastedTask, TaskFactory } from '@increaser/entities/TaskFactory'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'

type Input = {
  taskFactories: TaskFactory[]
  value: number
}

export const getForecastedTasks = ({
  taskFactories,
  value,
}: Input): ForecastedTask[] =>
  withoutUndefined(
    taskFactories.map(
      ({ cadence, lastOutputAt, deadlineIndex, id, ...task }) => {
        const periodStartedAt = getCadencePeriodStart({
          cadence,
          at: value,
        })
        if (lastOutputAt && lastOutputAt >= periodStartedAt) return

        const deadlineAt = getRecurringTaskDeadline({
          cadence,
          deadlineIndex,
          at: value,
        })

        if (deadlineAt === value) {
          return {
            ...task,
            cadence,
            deadlineIndex,
            willBeCreatedAt: periodStartedAt,
            lastOutputAt,
            factoryId: id,
          }
        }
      },
    ),
  )
