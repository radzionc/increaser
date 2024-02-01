import { DeadlineType } from '@increaser/entities/Task'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { endOfDay } from 'date-fns'

type GetDeadlineTypeInput = {
  now: number
  deadlineAt: number
}

export const getDeadlineType = ({
  deadlineAt,
  now,
}: GetDeadlineTypeInput): DeadlineType => {
  if (deadlineAt < now) return 'today'

  const todayEndsAt = endOfDay(now).getTime()
  if (deadlineAt <= todayEndsAt) return 'today'

  const tomorrowEndsAt = todayEndsAt + convertDuration(1, 'd', 'ms')
  if (deadlineAt <= tomorrowEndsAt) return 'tomorrow'

  const weekday = getWeekday(new Date(now))
  const thisWeekEndsAt =
    todayEndsAt +
    convertDuration(convertDuration(1, 'w', 'd') - weekday, 'd', 'ms')
  if (deadlineAt <= thisWeekEndsAt) return 'thisWeek'

  return 'nextWeek'
}
