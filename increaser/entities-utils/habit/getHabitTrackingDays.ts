import { Habit } from '@increaser/entities/Habit'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'

export const getHabitTrackingDays = ({
  startedAt,
}: Pick<Habit, 'startedAt'>) => {
  return Math.round(
    convertDuration(
      startOfDay(Date.now()).getTime() -
        startOfDay(convertDuration(startedAt, 's', 'ms')).getTime(),
      'ms',
      'd',
    ) + 1,
  )
}
