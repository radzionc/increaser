import { useProjects } from 'projects/hooks/useProjects'
import { range } from 'shared/utils/range'
import { useTheme } from 'styled-components'
import { CountableItemsVisualization } from 'ui/CountableItemsVisualization'
import { MIN_IN_HOUR } from 'utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

export const ProjectsGoalsVisualization = () => {
  const { totalMinutes } = useWeekTimeAllocation()
  const totalHours = totalMinutes / MIN_IN_HOUR

  const { colors } = useTheme()

  const { activeProjects } = useProjects()

  const projects = [...activeProjects].sort((a, b) => b.total - a.total)

  const items = []
  projects.forEach(({ hslaColor, allocatedMinutesPerWeek }) => {
    const hours = allocatedMinutesPerWeek / MIN_IN_HOUR
    items.push(...range(hours).map(() => hslaColor))
  })
  if (items.length < totalHours) {
    items.push(...range(totalHours - items.length).map(() => colors.mist))
  }

  return <CountableItemsVisualization items={items} />
}
