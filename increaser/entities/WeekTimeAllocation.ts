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

const minInHour = 60
const defaultWorkdayMinutes = 5 * minInHour
const defaultWeekendMinutes = 3 * minInHour

export const defaultWeekTimeAllocation: WeekTimeAllocation = [
  defaultWorkdayMinutes,
  defaultWorkdayMinutes,
  defaultWorkdayMinutes,
  defaultWorkdayMinutes,
  defaultWorkdayMinutes,
  defaultWeekendMinutes,
  defaultWeekendMinutes,
]
