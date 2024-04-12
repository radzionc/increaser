import { range } from '@lib/utils/array/range'
import { useTheme } from 'styled-components'
import { CountableItemsVisualization } from '@increaser/app/ui/CountableItemsVisualization'
import { MIN_IN_HOUR } from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
import { useMemo } from 'react'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const ProjectsBudgetVisualization = () => {
  const { totalMinutes } = useWeekTimeAllocation()
  const totalHours = totalMinutes / MIN_IN_HOUR

  const { colors } = useTheme()

  const projects = useBudgetedProjects()

  const items = useMemo(() => {
    const result = projects
      .map(({ hslaColor, allocatedMinutesPerWeek }) => {
        const hours = allocatedMinutesPerWeek / MIN_IN_HOUR
        return range(hours).map(() => hslaColor)
      })
      .flat()
    if (result.length < totalHours) {
      result.push(...range(totalHours - items.length).map(() => colors.mist))
    }

    return result
  }, [colors.mist, projects, totalHours])

  return <CountableItemsVisualization items={items} />
}
