import { getWeekday } from 'shared/utils/getWeekday'
import { MS_IN_MIN } from 'utils/time'

import { useRhythmicRerender } from './useRhythmicRerender'

export const useWeekday = () => {
  useRhythmicRerender(MS_IN_MIN)

  return getWeekday(new Date())
}
