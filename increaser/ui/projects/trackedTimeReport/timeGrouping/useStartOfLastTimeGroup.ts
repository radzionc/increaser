import { subtractPeriod } from '../utils/subtractPeriod'
import { useIsCurrentPeriodIncluded } from '../currentPeriod/useIsCurrentPeriodIncluded'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { useStartOfCurrentTimeGroup } from './useStartOfCurrentTimeGroup'

export const useStartOfLastTimeGroup = () => {
  const [isCurrentPeriodIncluded] = useIsCurrentPeriodIncluded()
  const [timeGrouping] = useTimeGrouping()

  const currentTimeGroupStartedAt = useStartOfCurrentTimeGroup()

  return isCurrentPeriodIncluded
    ? currentTimeGroupStartedAt
    : subtractPeriod({
        value: currentTimeGroupStartedAt,
        period: timeGrouping,
        amount: 1,
      })
}
