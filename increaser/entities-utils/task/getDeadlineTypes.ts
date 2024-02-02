import { DeadlineType, deadlineTypes } from '@increaser/entities/Task'
import { without } from '@lib/utils/array/without'
import { getWeekday } from '@lib/utils/time/getWeekday'

export const getDeadlineTypes = (now: number): readonly DeadlineType[] => {
  const weekday = getWeekday(new Date(now))
  if (weekday > 4) {
    return without(deadlineTypes, 'thisWeek')
  }

  return deadlineTypes
}
