import { DeadlineType, deadlineTypes } from '@increaser/entities/Task'
import { getDeadlineAt } from './getDeadlineAt'

type Input = {
  now: number
}

export const getCurrentDeadlines = ({
  now,
}: Input): Record<number, DeadlineType> =>
  deadlineTypes.reduce(
    (acc, deadlineType) => {
      const deadlineAt = getDeadlineAt({ deadlineType, now })
      if (!acc[deadlineAt]) {
        acc[deadlineAt] = deadlineType
      }

      return acc
    },
    {} as Record<number, DeadlineType>,
  )
