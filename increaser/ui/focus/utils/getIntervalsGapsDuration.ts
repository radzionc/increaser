import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { focusIntervalsToSets } from './focusIntervalsToSets'
import { FocusInterval } from '@increaser/app/focus/state/focusIntervals'

export const getIntervalsGapsDuration = (intervals: FocusInterval[]) => {
  const now = Date.now()

  const totalDuration = (getLastItem(intervals).end ?? now) - intervals[0].start

  const workDuration = getSetsDuration(
    focusIntervalsToSets({
      intervals,
      now,
    }),
  )

  return totalDuration - workDuration
}
