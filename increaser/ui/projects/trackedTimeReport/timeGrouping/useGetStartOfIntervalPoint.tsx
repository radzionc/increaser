import { useCallback } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useStartOfCurrentTimeGroup } from './useStartOfCurrentTimeGroup'
import { useSelectedInterval } from '../interval/useSelectedInterval'
import { useTotalIntervalLength } from '../interval/useTotalIntervalLength'
import { useTimeGrouping } from './state'

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
