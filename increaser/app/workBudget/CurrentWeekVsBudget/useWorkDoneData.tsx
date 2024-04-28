import { useCurrentWeekMinutesWorkedByDay } from '@increaser/ui/sets/hooks/useCurrentWeekMinutesWorkedByDay'
import { cumulativeSum } from '@lib/utils/math/cumulativeSum'

export const useWorkDoneData = () => {
  const days = useCurrentWeekMinutesWorkedByDay()

  return cumulativeSum(days)
}
