import { useMemo } from 'react'

import { recordMap } from '@lib/utils/record/recordMap'
import { useTotalIntervalProjectsTimeSeries } from './useTotalIntervalProjectsTimeSeries'
import { useSelectedInterval } from '../interval/useSelectedInterval'

export const useSelectedIntervalProjectsTimeSeries = () => {
  const timeSeries = useTotalIntervalProjectsTimeSeries()

  const [interval] = useSelectedInterval()

  return useMemo(
    () =>
      recordMap(timeSeries, (timeSeries) =>
        timeSeries.slice(interval.start, interval.end + 1),
      ),
    [interval, timeSeries],
  )
}
