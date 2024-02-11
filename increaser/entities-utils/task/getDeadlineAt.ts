import { DeadlineType } from '@increaser/entities/Task'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { endOfDay } from 'date-fns'

type GetDeadlineAtInput = {
  now: number
  deadlineType: DeadlineType
}

export const getDeadlineAt = ({
  deadlineType,
  now,
}: GetDeadlineAtInput): number => {
  const todayEndsAt = endOfDay(now).getTime()
  if (deadlineType === 'today') return todayEndsAt

  const tomorrowEndsAt = todayEndsAt + convertDuration(1, 'd', 'ms')
  if (deadlineType === 'tomorrow') return tomorrowEndsAt

  const weekdayIndex = getWeekday(new Date(now))
  const thisWeekEndsAt =
    todayEndsAt +
    convertDuration(
      convertDuration(1, 'w', 'd') - (weekdayIndex + 1),
      'd',
      'ms',
    )
  if (deadlineType === 'thisWeek') return thisWeekEndsAt

  return thisWeekEndsAt + convertDuration(1, 'w', 'ms')
}
