import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useStartOfCurrentTimeGroup } from './useStartOfCurrentTimeGroup'
import { useSelectedInterval } from '../interval/useSelectedInterval'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useTotalIntervalLength } from '../interval/useTotalIntervalLength'
import { useTimeGrouping } from './state'

export const useStartOfSelectedIntervalPoint = (index: number) => {
  const [interval] = useSelectedInterval()
  const totalIntervalLength = useTotalIntervalLength()

  const dataSize = getIntIntervalLength(interval)

  const currentTimeGroupStartedAt = useStartOfCurrentTimeGroup()
  const timeGrouping = useTimeGrouping()

  return useMemo(() => {
    return subtractPeriod({
      value: currentTimeGroupStartedAt,
      period: timeGrouping,
      amount: dataSize - index - (totalIntervalLength - interval.end),
    })
  }, [
    currentTimeGroupStartedAt,
    dataSize,
    index,
    interval.end,
    timeGrouping,
    totalIntervalLength,
  ])
}
