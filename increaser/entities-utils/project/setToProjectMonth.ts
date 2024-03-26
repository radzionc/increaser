import { Set } from '@increaser/entities/User'
import { getSetDurationInSeconds } from '../set/getSetDurationInSeconds'
import { getMonth, getYear } from 'date-fns'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { ProjectMonth } from '@increaser/entities/timeTracking'

export const setToProjectMonth = (
  set: Set,
  targetTimeZoneOffset: number,
): ProjectMonth => {
  const timestamp = inTimeZone(set.end, targetTimeZoneOffset)

  return {
    year: getYear(timestamp),
    month: getMonth(timestamp) + 1,
    seconds: getSetDurationInSeconds(set),
  }
}
