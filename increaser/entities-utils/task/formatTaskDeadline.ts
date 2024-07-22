import { endOfDay, format } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'

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

  const endOfToday = endOfDay(now).getTime()
  if (deadlineAt <= endOfToday) {
    return 'Today'
  }

  const endOfTomorrow = endOfToday + convertDuration(1, 'd', 'ms')
  if (deadlineAt <= endOfTomorrow) {
    return 'Tomorrow'
  }

  return format(deadlineAt, 'EEE, MMM d yyyy')
}
