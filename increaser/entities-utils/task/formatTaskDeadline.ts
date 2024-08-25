import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { format, isToday, isTomorrow, addWeeks } from 'date-fns'

type Input = {
  deadlineAt: number | null
  now: number
}

export const formatTaskDeadline = ({ deadlineAt, now }: Input) => {
  if (!deadlineAt) {
    return 'No deadline'
  }

  const thisWeekEndsAt = getWeekEndedAt(now)

  if (isToday(deadlineAt)) {
    return 'Today'
  }

  if (isTomorrow(deadlineAt)) {
    return 'Tomorrow'
  }

  const nextWeekEndsAt = addWeeks(thisWeekEndsAt, 1).getTime()
  if (deadlineAt > thisWeekEndsAt && deadlineAt <= nextWeekEndsAt) {
    const weekday = format(deadlineAt, 'EEEE')
    return `Next ${weekday}`
  }

  if (deadlineAt <= thisWeekEndsAt) {
    return format(deadlineAt, 'EEEE')
  }

  return format(deadlineAt, 'd MMM')
}
