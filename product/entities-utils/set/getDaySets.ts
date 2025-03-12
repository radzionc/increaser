import { isInRange } from '@lib/utils/isInRange'
import { Set } from '@product/entities/User'
import { endOfDay, startOfDay } from 'date-fns'

export const getDaySets = (sets: Set[], timestamp: number) => {
  const date = new Date(timestamp)
  const dateStart = startOfDay(date).getTime()
  const dateEnd = endOfDay(date).getTime()

  return sets.filter(({ start }) => isInRange(start, dateStart, dateEnd))
}
