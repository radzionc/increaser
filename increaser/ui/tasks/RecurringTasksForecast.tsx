import { useMemo } from 'react'
import { useTaskFactories } from '../taskFactories/hooks/useTaskFactories'
import { getCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getCadencePeriodStart'
import { getRecurringTaskDeadline } from '@increaser/entities-utils/taskFactory/getRecurringTaskDeadline'
import { ForecastedRecurringTask } from './ForecastedRecurringTask'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { useProjectFilter } from '../projects/filter/useProjectFilter'

type Props = {
  dayEndsAt: number
}

export const RecurringTasksForecast = ({ dayEndsAt }: Props) => {
  const taskFactories = useTaskFactories()
  const [projectId] = useProjectFilter()

  const tasks = useMemo(() => {
    return withoutUndefined(
      taskFactories.map(({ task, cadence, lastOutputAt, deadlineIndex }) => {
        const periodStartedAt = getCadencePeriodStart({
          cadence,
          at: dayEndsAt,
        })
        if (lastOutputAt && lastOutputAt >= periodStartedAt) return

        const deadlineAt = getRecurringTaskDeadline({
          cadence,
          deadlineIndex,
          at: dayEndsAt,
        })

        if (projectId && task.projectId !== projectId) {
          return
        }

        if (deadlineAt === dayEndsAt) {
          return task
        }
      }),
    )
  }, [dayEndsAt, projectId, taskFactories])

  return (
    <>
      {tasks.map((task, index) => (
        <ForecastedRecurringTask key={index} value={task} />
      ))}
    </>
  )
}
