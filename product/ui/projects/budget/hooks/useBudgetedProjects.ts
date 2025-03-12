import { order } from '@lib/utils/array/order'
import { useMemo } from 'react'

import { useActiveProjects } from '../../hooks/useActiveProjects'

export const useBudgetedProjects = () => {
  const activeProjects = useActiveProjects()

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
