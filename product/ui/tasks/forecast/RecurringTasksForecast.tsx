import { ValueProp } from '@lib/ui/props'
import { order } from '@lib/utils/array/order'
import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import { subDays } from 'date-fns'
import { endOfISOWeek } from 'date-fns'
import { useMemo } from 'react'

import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'

import { ForecastedRecurringTask } from './ForecastedRecurringTask'
import { getForecastedTasks } from './getForecastedTasks'
import { CurrentForecastedTaskProvider } from './state/currentForecastedTask'

export const RecurringTasksForecast = ({ value }: ValueProp<number>) => {
  const taskFactories = useFilterByProject(useTaskFactories(), getProjectId)

  const [timeGrouping] = useTaskTimeGrouping()

  const items = useMemo(() => {
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

        return values
          .reverse()
          .flatMap((value) => getForecastedTasks({ taskFactories, value }))
      },
    })

    return order(tasks, (task) => task.willBeCreatedAt, 'asc')
  }, [taskFactories, timeGrouping, value])

  return (
    <>
      {items.map((task, index) => (
        <CurrentForecastedTaskProvider key={index} value={task}>
          <ForecastedRecurringTask />
        </CurrentForecastedTaskProvider>
      ))}
    </>
  )
}
