import { FocusInterval } from '@increaser/app/focus/state/focusIntervals'
import { Set } from '@increaser/entities/User'

type Input = {
  intervals: FocusInterval[]
  now: number
}

export const focusIntervalsToSets = ({ intervals, now }: Input) => {
  const result: Set[] = []

  intervals.forEach(({ projectId, start, end: potentialEnd }) => {
    const end = potentialEnd ?? now

    const existingSet = result.find(
      (interval) => interval.projectId === projectId && interval.end === start,
    )

    if (existingSet) {
      existingSet.end = end
    } else {
      result.push({
        projectId,
        start,
        end,
      })
    }
  })

  return result
}
