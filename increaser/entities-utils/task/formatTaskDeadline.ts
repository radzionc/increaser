import { formatDay } from '@lib/utils/time/Day'

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

  return formatDay(deadlineAt)
}
