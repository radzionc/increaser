import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useProjectsBudgetedHours = () => {
  const { activeProjects } = useProjects()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return convertDuration(allocatedMinutes, 'min', 'h')
}
