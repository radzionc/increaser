import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { order } from '@lib/utils/array/order'
import { useMemo } from 'react'

export const useBudgetedProjects = () => {
  const { activeProjects } = useProjects()

  return useMemo(
    () =>
      order(
        activeProjects.filter((p) => p.allocatedMinutesPerWeek > 0),
        (p) => p.allocatedMinutesPerWeek,
        'desc',
      ),
    [activeProjects],
  )
}
