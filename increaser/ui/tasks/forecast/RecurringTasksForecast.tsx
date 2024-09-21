import { useMemo } from 'react'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { ForecastedRecurringTask } from './ForecastedRecurringTask'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { subDays } from 'date-fns'
import { match } from '@lib/utils/match'
import { getForecastedTasks } from './getForecastedTasks'
import { range } from '@lib/utils/array/range'
import { useFilterByProject } from '../../projects/filter/useFilterByProject'
import { endOfISOWeek } from 'date-fns'
import { Task } from '@increaser/entities/Task'

type Item = {
  task: Pick<
    Task,
    'name' | 'description' | 'projectId' | 'links' | 'checklist'
  > & {
    factoryId: string
  }
  count?: number
}

const getTaskFactoryProjectId = ({ projectId }: TaskFactory) => projectId

export const RecurringTasksForecast = ({
  value,
}: ComponentWithValueProps<number>) => {
  const taskFactories = useFilterByProject(
    useTaskFactories(),
    getTaskFactoryProjectId,
  )

  const [timeGrouping] = useTaskTimeGrouping()

  const items: Item[] = useMemo(() => {
    const tasks = match(timeGrouping, {
      day: () => {
        return getForecastedTasks({ taskFactories, value })
      },
      week: () => {
        const weekEndsAt = endOfISOWeek(value).getTime()

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

    return result
  }, [taskFactories, timeGrouping, value])

  return (
    <>
      {items.map(({ task, count }, index) => (
        <ForecastedRecurringTask key={index} value={task} count={count} />
      ))}
    </>
  )
}
