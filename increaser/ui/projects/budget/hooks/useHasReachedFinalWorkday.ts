import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useProjectDaysAllocation } from './useProjectDaysAllocation'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const useHasReachedFinalWorkday = () => {
  const currentWeekday = useWeekday()
  const allocation = useProjectDaysAllocation()

  return currentWeekday >= getLastItem(allocation).weekday
}
