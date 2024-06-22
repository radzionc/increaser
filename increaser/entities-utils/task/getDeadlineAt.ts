import { DeadlineType } from '@increaser/entities/Task'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { endOfDay, endOfMonth } from 'date-fns'

type GetDeadlineAtInput = {
  now: number
  deadlineType: DeadlineType
}

const getThisWeekEndsAt = (now: number): number => {
  const weekdayIndex = getWeekday(new Date(now))
  return (
    endOfDay(now).getTime() +
    convertDuration(
      convertDuration(1, 'w', 'd') - (weekdayIndex + 1),
      'd',
      'ms',
    )
  )
}

export const getDeadlineAt = ({
  deadlineType,
  now,
}: GetDeadlineAtInput): number => {
  return match(deadlineType, {
    today: () => endOfDay(now).getTime(),
    tomorrow: () => endOfDay(now).getTime() + convertDuration(1, 'd', 'ms'),
    thisMonth: () => endOfMonth(now).getTime(),
    thisWeek: () => getThisWeekEndsAt(now),
    nextWeek: () => getThisWeekEndsAt(now) + convertDuration(1, 'w', 'ms'),
  })
}
