import { Set } from '@increaser/entities/User'
import { ProjectMonth } from '@increaser/entities/Project'
import { getSetDurationInSeconds } from '../set/getSetDurationInSeconds'
import { getMonth, getYear } from 'date-fns'
import { inTimeZone } from '@increaser/utils/time/inTimeZone'

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
