import { ProjectWeek } from '@increaser/entities/Project'
import { Set } from '@increaser/entities/User'
import { inTimeZone } from '@increaser/utils/inTimeZone'
import { getWeek, getYear } from 'date-fns'
import { getSetDurationInSeconds } from '../set/getSetDurationInSeconds'

export const setToProjectWeek = (
  set: Set,
  targetTimeZoneOffset: number,
): ProjectWeek => {
  const timestamp = inTimeZone(set.end, targetTimeZoneOffset)

  return {
    year: getYear(timestamp),
    week: getWeek(timestamp, { weekStartsOn: 1 }) - 1,
    seconds: getSetDurationInSeconds(set),
  }
}
