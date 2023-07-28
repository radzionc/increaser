import { endOfDay, startOfDay } from 'date-fns'
import { Set } from 'sets/Set'
import { isInRange } from 'shared/utils/isInRange'

export const getDaySets = (sets: Set[], timestamp: number) => {
  const date = new Date(timestamp)
  const dateStart = startOfDay(date).getTime()
  const dateEnd = endOfDay(date).getTime()

  return sets.filter(({ start }) => isInRange(start, dateStart, dateEnd))
}
