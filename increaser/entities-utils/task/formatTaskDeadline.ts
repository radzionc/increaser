import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDay } from '@lib/utils/time/Day'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { format } from 'date-fns'

type Input = {
  deadlineAt: number | null
  now: number
}

export const formatTaskDeadline = ({ deadlineAt, now }: Input) => {
  if (!deadlineAt) {
    return 'No deadline'
  }

  if (deadlineAt < now) {
    return 'Overdue'
  }

  const thisWeekEndsAt = getWeekEndedAt(now)

  const nextWeekEndsAt = thisWeekEndsAt + convertDuration(1, 'w', 'ms')
  if (deadlineAt > thisWeekEndsAt && deadlineAt <= nextWeekEndsAt) {
    const weekday = format(deadlineAt, 'EEEE')
    return `Next ${weekday}`
  }

  return formatDay(deadlineAt)
}
