import { useMemo } from 'react'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'
import { useCurrentPeriodStartedAt } from './useCurrentPeriodStartedAt'
import { subtractPeriod } from '../utils/subtractPeriod'

export const useLastDataPointStartedAt = () => {
  const [{ includeCurrentPeriod, timeGrouping }] =
    useTrackedTimeReportPreferences()

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

  return includeCurrentPeriod ? currentPeriodStartedAt : previousPeriodStartedAt
}
