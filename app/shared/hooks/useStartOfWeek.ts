import { MS_IN_DAY } from 'utils/time'

import { useStartOfDay } from './useStartOfDay'
import { useWeekday } from './useWeekday'

export const useStartOfWeek = () => {
  const startOfDay = useStartOfDay()
  const weekday = useWeekday()

  return startOfDay - MS_IN_DAY * weekday
}
