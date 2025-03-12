import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { getLastItem } from '@lib/utils/array/getLastItem'

import { useProjectDaysAllocation } from './useProjectDaysAllocation'

export const useHasReachedFinalWorkday = () => {
  const currentWeekday = useWeekday()
  const allocation = useProjectDaysAllocation()

  return currentWeekday >= getLastItem(allocation).weekday
}
