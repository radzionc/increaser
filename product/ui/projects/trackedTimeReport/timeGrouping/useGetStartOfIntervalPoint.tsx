import { useCallback } from 'react'

import { useSelectedInterval } from '../interval/useSelectedInterval'
import { useTotalIntervalLength } from '../interval/useTotalIntervalLength'
import { subtractPeriod } from '../utils/subtractPeriod'

import { useTimeGrouping } from './state'
import { useStartOfCurrentTimeGroup } from './useStartOfCurrentTimeGroup'

export const useGetStartOfIntervalPoint = () => {
  const [interval] = useSelectedInterval()
  const totalIntervalLength = useTotalIntervalLength()

  const currentTimeGroupStartedAt = useStartOfCurrentTimeGroup()
  const timeGrouping = useTimeGrouping()

  return useCallback(
    (index: number) => {
      return subtractPeriod({
        value: currentTimeGroupStartedAt,
        period: timeGrouping,
        amount: totalIntervalLength - interval.start - index - 1,
      })
    },
    [
      currentTimeGroupStartedAt,
      interval.start,
      timeGrouping,
      totalIntervalLength,
    ],
  )
}
