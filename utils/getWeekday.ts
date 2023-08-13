import { D_IN_WEEK } from '@increaser/ui/shared/utils/time'

export const getWeekday = (date: Date) => {
  return (date.getDay() + 6) % D_IN_WEEK
}
