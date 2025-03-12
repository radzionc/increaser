import { recordMap } from '@lib/utils/record/recordMap'
import { useMemo } from 'react'

import { useSelectedInterval } from '../interval/useSelectedInterval'

import { useTotalIntervalProjectsTimeSeries } from './useTotalIntervalProjectsTimeSeries'

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
