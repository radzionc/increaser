import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { ForecastedTask, TaskFactory } from '@product/entities/TaskFactory'
import { getCadencePeriodStart } from '@product/entities-utils/taskFactory/getCadencePeriodStart'
import { getRecurringTaskDeadline } from '@product/entities-utils/taskFactory/getRecurringTaskDeadline'

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
