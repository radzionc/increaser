import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { focusIntervalsToSets } from './focusIntervalsToSets'
import { FocusInterval } from '../FocusContext'

export const getIntervalsGapsDuration = (intervals: FocusInterval[]) => {
  const totalDuration =
    (getLastItem(intervals).end ?? Date.now()) - intervals[0].start

  const workDuration = getSetsDuration(
    focusIntervalsToSets({
      intervals,
      now: Date.now(),
    }),
  )

  return totalDuration - workDuration
}
