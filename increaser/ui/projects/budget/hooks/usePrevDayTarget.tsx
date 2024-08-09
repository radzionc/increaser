import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import { useProjectDaysAllocation } from './useProjectDaysAllocation'

export const usePrevDayTarget = () => {
  const { allocatedMinutesPerWeek } = useCurrentProject()

  const allocation = useProjectDaysAllocation()

  const weekday = useWeekday()

  return allocatedMinutesPerWeek * sum(allocation.slice(0, weekday))
}
