import { Set } from '@increaser/entities/User'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getYear } from 'date-fns'
import { getSetDurationInSeconds } from '../set/getSetDurationInSeconds'
import { getWeekIndex } from '@lib/utils/time/getWeekIndex'
import { ProjectWeek } from '@increaser/entities/timeTracking'

export const setToProjectWeek = (
  set: Set,
  targetTimeZoneOffset: number,
): ProjectWeek => {
  const timestamp = inTimeZone(set.end, targetTimeZoneOffset)

  return {
    year: getYear(timestamp),
    week: getWeekIndex(timestamp),
    seconds: getSetDurationInSeconds(set),
  }
}
