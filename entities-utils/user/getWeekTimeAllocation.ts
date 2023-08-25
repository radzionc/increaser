import { WeekTimeAllocation } from '@increaser/entities/WeekTimeAllocation'

export const getWeekTimeAllocation = (
  workdayMinutes: number,
  weekendMinutes: number,
): WeekTimeAllocation => [
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  workdayMinutes,
  weekendMinutes,
  weekendMinutes,
]
