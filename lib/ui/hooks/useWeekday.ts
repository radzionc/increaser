import { getWeekday } from '@lib/utils/time/getWeekday'
import { MS_IN_MIN } from '@lib/utils/time'
import { useRhythmicRerender } from './useRhythmicRerender'

export const useWeekday = () => {
  const now = useRhythmicRerender(MS_IN_MIN)

  return getWeekday(now)
}
