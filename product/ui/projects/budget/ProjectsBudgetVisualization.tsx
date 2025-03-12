import { CountableItemsVisualization } from '@lib/ui/visual/CountableItemsVisualization'
import { range } from '@lib/utils/array/range'
import { MIN_IN_HOUR } from '@lib/utils/time'
import { useBudgetedProjects } from '@product/ui/projects/budget/hooks/useBudgetedProjects'
import { useWorkBudgetTotal } from '@product/ui/workBudget/hooks/useWorkBudgetTotal'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'

export const ProjectsBudgetVisualization = () => {
  const workBudgetTotal = useWorkBudgetTotal()
  const { colors } = useTheme()

  const projects = useBudgetedProjects()

  const items = useMemo(() => {
    const result = projects
      .map(({ color, allocatedMinutesPerWeek }) => {
        const hours = allocatedMinutesPerWeek / MIN_IN_HOUR
        return range(hours).map(() => colors.getLabelColor(color))
      })
      .flat()
    if (result.length < workBudgetTotal) {
      result.push(
        ...range(workBudgetTotal - result.length).map(() => colors.mist),
      )
    }

    return result
  }, [colors, projects, workBudgetTotal])

  return <CountableItemsVisualization value={items} />
}
