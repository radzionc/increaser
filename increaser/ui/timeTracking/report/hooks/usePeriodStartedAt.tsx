import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useLastDataPointStartedAt } from './useLastDataPointStartedAt'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'
import { useCurrentDataSize } from './useCurrentDataSize'

export const usePeriodStartedAt = (index: number) => {
  const lastDataPointStartedAt = useLastDataPointStartedAt()
  const [{ timeGrouping }] = useTrackedTimeReportPreferences()
  const dataSize = useCurrentDataSize()

  return useMemo(() => {
    return subtractPeriod({
      value: lastDataPointStartedAt,
      period: timeGrouping,
      amount: dataSize - index - 1,
    })
  }, [dataSize, index, lastDataPointStartedAt, timeGrouping])
}
