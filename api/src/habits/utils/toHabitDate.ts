import { padWithZero } from '@increaser/utils/padWithZero'

export const toHabitDate = (date: Date) =>
  `${padWithZero(date.getDate())}-${date.getMonth() + 1}-${date.getFullYear()}`
