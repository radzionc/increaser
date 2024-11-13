import { useCurrentWeekMinutesWorkedByDay } from '@increaser/ui/sets/hooks/useCurrentWeekMinutesWorkedByDay'
import { cumulativeSum } from '@lib/utils/math/cumulativeSum'
import { useMemo } from 'react'

export const useWorkDoneData = () => {
  const days = useCurrentWeekMinutesWorkedByDay()

  return useMemo(() => [0, ...cumulativeSum(days)], [days])
}
