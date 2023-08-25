import { getWeekday } from '@increaser/utils/getWeekday'
import { MS_IN_MIN } from '@increaser/utils/time'

import { useRhythmicRerender } from './useRhythmicRerender'

export const useWeekday = () => {
  useRhythmicRerender(MS_IN_MIN)

  return getWeekday(new Date())
}
