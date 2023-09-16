import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useWeekday } from './useWeekday'
import { convertDuration } from '@increaser/utils/time/convertDuration'

export const useStartOfWeek = () => {
  const startOfDay = useStartOfDay()
  const weekday = useWeekday()

  return startOfDay - convertDuration(weekday, 'd', 'ms')
}
