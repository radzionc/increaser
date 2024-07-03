import { DeadlineStatus } from '@increaser/entities/Task'

import { getCurrentDeadlines } from './getCurrentDeadlines'
import { getLastItem } from '@lib/utils/array/getLastItem'

type GetDeadlineStatusInput = {
  now: number
  deadlineAt: number | null
}

export const getDeadlineStatus = ({
  deadlineAt,
  now,
}: GetDeadlineStatusInput): DeadlineStatus => {
  if (!deadlineAt) return 'none'
  if (deadlineAt < now) return 'overdue'

  const currentDeadlines = getCurrentDeadlines({ now })
  for (const [endsAt, deadlineType] of Object.entries(currentDeadlines)) {
    if (deadlineAt <= Number(endsAt)) {
      return deadlineType
    }
  }

  return getLastItem(Object.values(currentDeadlines))
}
