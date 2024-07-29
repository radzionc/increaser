import { Set } from '@increaser/entities/User'
import { FocusInterval } from '../FocusContext'

type Input = {
  intervals: FocusInterval[]
  now: number
}

export const focusIntervalsToSets = ({ intervals, now }: Input) => {
  const result: Set[] = []

  intervals.forEach(({ projectId, start, end }) => {
    const set = {
      projectId,
      start,
      end: end ?? now,
    }

    const previousSet = result[result.length - 1]
    if (!previousSet) {
      result.push(set)
      return
    }

    if (
      previousSet.projectId === set.projectId &&
      previousSet.end === set.start
    ) {
      previousSet.end = set.end
      return
    }
  })

  return result
}
