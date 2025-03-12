import { cumulativeSum } from '@lib/utils/math/cumulativeSum'
import { useCurrentWeekMinutesWorkedByDay } from '@product/ui/sets/hooks/useCurrentWeekMinutesWorkedByDay'
import { useMemo } from 'react'

export const useWorkDoneData = () => {
  const days = useCurrentWeekMinutesWorkedByDay()

  return useMemo(() => [0, ...cumulativeSum(days)], [days])
}
