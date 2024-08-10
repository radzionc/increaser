import { useMemo } from 'react'
import { useCurrentPeriodStartedAt } from './useCurrentPeriodStartedAt'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useIsCurrentPeriodIncluded } from '../currentPeriod/useIsCurrentPeriodIncluded'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'

export const useLastDataPointStartedAt = () => {
  const [isCurrentPeriodIncluded] = useIsCurrentPeriodIncluded()
  const [timeGrouping] = useTimeGrouping()

  const currentPeriodStartedAt = useCurrentPeriodStartedAt(timeGrouping)

  const previousPeriodStartedAt = useMemo(
    () =>
      subtractPeriod({
        value: currentPeriodStartedAt,
        period: timeGrouping,
        amount: 1,
      }),
    [timeGrouping, currentPeriodStartedAt],
  )

  return isCurrentPeriodIncluded
    ? currentPeriodStartedAt
    : previousPeriodStartedAt
}
