import { D_IN_WEEK } from 'utils/time'

export const getWeekday = (date: Date) => {
  return (date.getDay() + 6) % D_IN_WEEK
}
