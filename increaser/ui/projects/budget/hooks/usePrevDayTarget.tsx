import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import { useProjectDaysAllocation } from './useProjectDaysAllocation'
import { useMemo } from 'react'

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
