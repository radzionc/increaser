import { Habit } from '@increaser/entities/Habit'
import { getHabitTrackingDays } from './getHabitTrackingDays'
import { toHabitDate } from './toHabitDate'

export const getHabitPassedDays = ({
  startedAt,
  successes,
}: Pick<Habit, 'startedAt' | 'successes'>) => {
  const trackingDays = getHabitTrackingDays({ startedAt })
  const todayHabitDate = toHabitDate(new Date())
  if (successes.includes(todayHabitDate)) {
    return trackingDays
  }

  return trackingDays - 1
}
