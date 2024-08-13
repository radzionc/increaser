import { useMemo } from 'react'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { ForecastedRecurringTask } from './ForecastedRecurringTask'
import { useProjectFilter } from '../../projects/filter/ProjectFilterProvider'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { subDays } from 'date-fns'
import { match } from '@lib/utils/match'
import { getForecastedTasks } from './getForecastedTasks'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { range } from '@lib/utils/array/range'

type Item = {
  task: TaskFactory['task'] & {
    factoryId: string
  }
  count?: number
}

export const RecurringTasksForecast = ({
  value,
}: ComponentWithValueProps<number>) => {
  const taskFactories = useTaskFactories()
  const [projectId] = useProjectFilter()

  const [timeGrouping] = useTaskTimeGrouping()

  const items: Item[] = useMemo(() => {
    const tasks = match(timeGrouping, {
      day: () => {
        return getForecastedTasks({ taskFactories, value })
      },
      week: () => {
        const weekEndsAt = getWeekEndedAt(value)

        const values: number[] = []
        const now = Date.now()
        range(7).forEach((index) => {
          const dayEndsAt = subDays(weekEndsAt, index).getTime()
          if (dayEndsAt > now) {
            values.push(dayEndsAt)
          }
        })

        return values.flatMap((value) =>
          getForecastedTasks({ taskFactories, value }),
        )
      },
    })

    const result: Item[] = []

    tasks.forEach((task) => {
      const index = result.findIndex(
        (item) => item.task.factoryId === task.factoryId,
      )
      if (index === -1) {
        result.push({ task, count: 1 })
      } else {
        result[index].count = (result[index].count || 0) + 1
      }
    })

    if (projectId) {
      return result.filter(({ task }) => task.projectId === projectId)
    }

    return result
  }, [projectId, taskFactories, timeGrouping, value])

  return (
    <>
      {items.map(({ task, count }, index) => (
        <ForecastedRecurringTask key={index} value={task} count={count} />
      ))}
    </>
  )
}
