import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'

export const useCurrentDayTarget = () => {
  const { allocatedMinutesPerWeek } = useCurrentProject()

  const allocation = useProjectDaysAllocation()

  const weekday = useWeekday()

  return allocatedMinutesPerWeek * sum(allocation.slice(0, weekday + 1))
}
