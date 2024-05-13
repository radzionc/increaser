import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useProjectDaysAllocation } from './useProjectDaysAllocation'

export const useHasReachedFinalWorkday = () => {
  const weekday = useWeekday()
  const allocation = useProjectDaysAllocation()

  return weekday + 1 >= allocation.length
}
