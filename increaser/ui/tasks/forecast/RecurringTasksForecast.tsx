import { useMemo } from 'react'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { ForecastedRecurringTask } from './ForecastedRecurringTask'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { subDays } from 'date-fns'
import { match } from '@lib/utils/match'
import { getForecastedTasks } from './getForecastedTasks'
import { range } from '@lib/utils/array/range'
import { endOfISOWeek } from 'date-fns'
import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { CurrentForecastedTaskProvider } from './state/currentForecastedTask'

export const RecurringTasksForecast = ({
  value,
}: ComponentWithValueProps<number>) => {
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

    return tasks
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
