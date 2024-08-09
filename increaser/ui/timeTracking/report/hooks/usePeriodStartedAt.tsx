import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'

export const usePeriodStartedAt = (index: number) => {
  const { lastTimeGroupStartedAt, timeGrouping, dataPointsCount } =
    useTrackedTimeReport()

  return useMemo(() => {
    return subtractPeriod({
      value: lastTimeGroupStartedAt,
      period: timeGrouping,
      amount: dataPointsCount - index - 1,
    })
  }, [dataPointsCount, index, lastTimeGroupStartedAt, timeGrouping])
}
