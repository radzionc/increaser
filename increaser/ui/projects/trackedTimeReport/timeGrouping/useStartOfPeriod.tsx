import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useLastDataPointStartedAt } from '../hooks/useLastDataPointStartedAt'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { useTimeGrouping } from './useTimeGrouping'

export const useStartOfPeriod = (index: number) => {
  const lastDataPointStartedAt = useLastDataPointStartedAt()
  const [timeGrouping] = useTimeGrouping()
  const dataSize = useCurrentDataSize()

  return useMemo(() => {
    return subtractPeriod({
      value: lastDataPointStartedAt,
      period: timeGrouping,
      amount: dataSize - index - 1,
    })
  }, [dataSize, index, lastDataPointStartedAt, timeGrouping])
}
