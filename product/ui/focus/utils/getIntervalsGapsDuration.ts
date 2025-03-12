import { getLastItem } from '@lib/utils/array/getLastItem'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'
import { FocusInterval } from '@product/ui/focus/state/focusIntervals'

import { focusIntervalsToSets } from './focusIntervalsToSets'

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
