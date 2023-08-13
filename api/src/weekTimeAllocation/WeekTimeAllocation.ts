import { minInHour } from '../shared/helpers/time'

// minutes starting from monday
export type WeekTimeAllocation = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

const workdayMinutes = 5 * minInHour
const weekendMinutes = 3 * minInHour
export const defaultWeekTimeAllocation: WeekTimeAllocation = [
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  weekendMinutes,
  weekendMinutes,
]
