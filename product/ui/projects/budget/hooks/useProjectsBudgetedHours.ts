import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'

import { useActiveProjects } from '../../hooks/useActiveProjects'

export const useProjectsBudgetedHours = () => {
  const activeProjects = useActiveProjects()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return convertDuration(allocatedMinutes, 'min', 'h')
}
