import { useMemo } from 'react'

import { recordMap } from '@lib/utils/record/recordMap'
import { useTrackedTimeSelectedInterval } from '../interval/useTrackedTimeSelectedInterval'
import { useMaxIntervalProjectsTimeSeries } from './useMaxIntervalProjectsTimeSeries'

export const useSelectedIntervalProjectsTimeSeries = () => {
  const timeSeries = useMaxIntervalProjectsTimeSeries()

  const [interval] = useTrackedTimeSelectedInterval()

  return useMemo(
    () =>
      recordMap(timeSeries, (timeSeries) =>
        timeSeries.slice(interval.start, interval.end + 1),
      ),
    [interval, timeSeries],
  )
}
