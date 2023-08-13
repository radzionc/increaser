import { D_IN_WEEK } from './time'

export const getWeekday = (date: Date) => {
  return (date.getDay() + 6) % D_IN_WEEK
}
