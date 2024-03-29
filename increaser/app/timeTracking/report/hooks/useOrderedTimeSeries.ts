import { order } from '@lib/utils/array/order'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { sum } from '@lib/utils/array/sum'
import { useMemo } from 'react'

export const useOrderedTimeSeries = () => {
  const { projectsTimeSeries } = useTrackedTimeReport()

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
