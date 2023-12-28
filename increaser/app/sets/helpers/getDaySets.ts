import { endOfDay, startOfDay } from 'date-fns'
import { Set } from '@increaser/app/sets/Set'
import { isInRange } from '@lib/utils/isInRange'

export const getDaySets = (sets: Set[], timestamp: number) => {
  const date = new Date(timestamp)
  const dateStart = startOfDay(date).getTime()
  const dateEnd = endOfDay(date).getTime()

  return sets.filter(({ start }) => isInRange(start, dateStart, dateEnd))
}
