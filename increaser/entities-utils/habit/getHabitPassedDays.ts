import { ActiveHabit } from '@increaser/entities/Habit'
import { getHabitTrackingDays } from './getHabitTrackingDays'
import { toHabitDate } from './toHabitDate'

export const getHabitPassedDays = ({
  startedAt,
  successes,
}: Pick<ActiveHabit, 'startedAt' | 'successes'>) => {
  const trackingDays = getHabitTrackingDays({ startedAt })
  const todayHabitDate = toHabitDate(Date.now())
  if (successes.includes(todayHabitDate)) {
    return trackingDays
  }

  return trackingDays - 1
}
