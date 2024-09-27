import { useMemo } from 'react'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useTimeGrouping } from './useTimeGrouping'
import { useStartOfCurrentTimeGroup } from './useStartOfCurrentTimeGroup'
import { useTrackedTimeSelectedInterval } from '../interval/useTrackedTimeSelectedInterval'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'

export const useStartOfPeriod = (index: number) => {
  const [interval] = useTrackedTimeSelectedInterval()

  const dataSize = getIntervalDuration(interval)

  const currentTimeGroupStartedAt = useStartOfCurrentTimeGroup()
  const [timeGrouping] = useTimeGrouping()

  return useMemo(() => {
    return subtractPeriod({
      value: currentTimeGroupStartedAt,
      period: timeGrouping,
      amount: dataSize - index - 1,
    })
  }, [dataSize, index, currentTimeGroupStartedAt, timeGrouping])
}
