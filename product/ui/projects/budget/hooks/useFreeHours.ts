import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkBudgetTotal } from '@product/ui/workBudget/hooks/useWorkBudgetTotal'

import { useActiveProjects } from '../../hooks/useActiveProjects'

export const useFreeHours = () => {
  const activeProjects = useActiveProjects()

  const workBudgetTotal = useWorkBudgetTotal()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return workBudgetTotal - convertDuration(allocatedMinutes, 'min', 'h')
}
