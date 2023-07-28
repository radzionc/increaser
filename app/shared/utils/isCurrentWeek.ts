import { areSameWeek } from './areSameWeek'
import { toWeek } from './toWeek'

export const isCurrentWeek = (timestamp: number) => {
  return areSameWeek(toWeek(timestamp), toWeek(Date.now()))
}
