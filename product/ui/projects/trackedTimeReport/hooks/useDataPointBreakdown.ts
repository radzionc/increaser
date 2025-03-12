import { order } from '@lib/utils/array/order'
import { Entry } from '@lib/utils/entities/Entry'
import { useMemo } from 'react'

import { useSelectedIntervalProjectsTimeSeries } from '../projects/useSelectedIntervalProjectsTimeSeries'

export const useDataPointBreakdown = (index: number) => {
  const projectsTimeSeries = useSelectedIntervalProjectsTimeSeries()

  return useMemo(() => {
    const result: Entry<string, number>[] = []

    Object.entries(projectsTimeSeries).forEach(([key, timeSeries]) => {
      const value = timeSeries[index]
      if (value) {
        result.push({
          key,
          value,
        })
      }
    })

    return order(result, (item) => item.value, 'desc')
  }, [index, projectsTimeSeries])
}
