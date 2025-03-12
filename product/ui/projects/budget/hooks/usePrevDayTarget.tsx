import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import { useMemo } from 'react'

import { useProjectDaysAllocation } from './useProjectDaysAllocation'

export const usePrevDayTarget = () => {
  const { allocatedMinutesPerWeek } = useCurrentProject()

  const allocation = useProjectDaysAllocation()

  const currentWeekday = useWeekday()

  return useMemo(() => {
    const share = sum(
      allocation
        .filter(({ weekday }) => weekday < currentWeekday)
        .map(({ value }) => value),
    )

    return allocatedMinutesPerWeek * share
  }, [allocatedMinutesPerWeek, allocation, currentWeekday])
}
