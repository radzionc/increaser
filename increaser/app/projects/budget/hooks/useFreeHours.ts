import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useWorkBudgetTotal } from '@increaser/ui/workBudget/hooks/useWorkBudgetTotal'
import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useFreeHours = () => {
  const { activeProjects } = useProjects()

  const workBudgetTotal = useWorkBudgetTotal()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return workBudgetTotal - convertDuration(allocatedMinutes, 'min', 'h')
}
