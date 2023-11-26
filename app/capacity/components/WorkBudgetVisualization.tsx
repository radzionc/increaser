import { range } from '@increaser/utils/array/range'
import { useTheme } from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { MIN_IN_HOUR } from '@increaser/utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { CountableItemsVisualization } from 'ui/CountableItemsVisualization'

export const WorkBudgetVisualization = () => {
  const { allocation } = useWeekTimeAllocation()

  const { colors } = useTheme()

  const items: HSLA[] = []
  allocation.forEach((minutes, weekday) => {
    const hours = minutes / MIN_IN_HOUR
    const color = weekday < 5 ? colors.success : colors.idle
    items.push(...range(hours).map(() => color))
  })

  return <CountableItemsVisualization items={items} />
}
