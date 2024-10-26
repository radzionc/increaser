import { padWithZero } from '@lib/utils/padWithZero'
import { Milliseconds } from '@lib/utils/time/types'

export const toHabitDate = (timestamp: Milliseconds) => {
  const date = new Date(timestamp)

  return `${padWithZero(date.getDate())}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`
}
