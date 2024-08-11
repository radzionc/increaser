import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { useTimeGrouping } from './useTimeGrouping'
import { useStartOfLastTimeGroup } from './useStartOfLastTimeGroup'

export const useStartOfPeriod = (index: number) => {
  const lastDataPointStartedAt = useStartOfLastTimeGroup()
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
