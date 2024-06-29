import { useWorkBudgetTotal } from '@increaser/ui/workBudget/hooks/useWorkBudgetTotal'
import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useActiveProjects } from '../../hooks/useActiveProjects'

export const useFreeHours = () => {
  const activeProjects = useActiveProjects()

  const workBudgetTotal = useWorkBudgetTotal()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return workBudgetTotal - convertDuration(allocatedMinutes, 'min', 'h')
}
