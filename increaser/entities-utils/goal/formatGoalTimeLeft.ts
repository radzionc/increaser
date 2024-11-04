import { convertDuration } from '@lib/utils/time/convertDuration'
import { intervalToDuration, Duration, formatDuration } from 'date-fns'

export const formatGoalTimeLeft = (deadlineAt: number) => {
  const now = Date.now()

  if (now > deadlineAt) {
    return null
  }
  const duration = intervalToDuration({
    start: now,
    end: deadlineAt,
  })

  const extraPrecision: (keyof Duration)[] =
    deadlineAt - now < convertDuration(1, 'd', 'ms') ? ['hours', 'minutes'] : []
  const durationStr = formatDuration(duration, {
    format: ['years', 'months', 'days', ...extraPrecision],
  })

  return durationStr
}
