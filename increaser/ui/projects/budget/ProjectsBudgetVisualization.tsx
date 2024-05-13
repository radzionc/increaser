import { range } from '@lib/utils/array/range'
import { useTheme } from 'styled-components'
import { CountableItemsVisualization } from '@lib/ui/visual/CountableItemsVisualization'
import { MIN_IN_HOUR } from '@lib/utils/time'
import { useMemo } from 'react'
import { useBudgetedProjects } from '@increaser/ui/projects/budget/hooks/useBudgetedProjects'
import { useWorkBudgetTotal } from '@increaser/ui/workBudget/hooks/useWorkBudgetTotal'

export const ProjectsBudgetVisualization = () => {
  const workBudgetTotal = useWorkBudgetTotal()
  const { colors } = useTheme()

  const projects = useBudgetedProjects()

  const items = useMemo(() => {
    const result = projects
      .map(({ hslaColor, allocatedMinutesPerWeek }) => {
        const hours = allocatedMinutesPerWeek / MIN_IN_HOUR
        return range(hours).map(() => hslaColor)
      })
      .flat()
    if (result.length < workBudgetTotal) {
      result.push(
        ...range(workBudgetTotal - result.length).map(() => colors.mist),
      )
    }

    return result
  }, [colors.mist, projects, workBudgetTotal])

  return <CountableItemsVisualization value={items} />
}
