import { MIN_IN_HOUR } from '@increaser/utils/time'

export type WeekTimeAllocation = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

export const defaultWorkdayMinutes = 5 * MIN_IN_HOUR
export const defaultWeekendMinutes = 3 * MIN_IN_HOUR
