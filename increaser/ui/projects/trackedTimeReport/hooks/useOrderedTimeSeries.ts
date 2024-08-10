import { order } from '@lib/utils/array/order'
import { sum } from '@lib/utils/array/sum'
import { useMemo } from 'react'
import { useProjectsTimeSeries } from './useProjectsTimeSeries'

export const useOrderedTimeSeries = () => {
  const projectsTimeSeries = useProjectsTimeSeries()

  return useMemo(
    () =>
      order(Object.entries(projectsTimeSeries), ([, data]) => sum(data), 'desc')
        .filter(([, data]) => sum(data) > 0)
        .map(([id, data]) => ({
          id,
          data,
        })),
    [projectsTimeSeries],
  )
}
