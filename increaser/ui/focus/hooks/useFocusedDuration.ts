import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '../utils/focusIntervalsToSets'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useMemo } from 'react'
import { useAssertFocusIntervals } from '@increaser/app/focus/state/focusIntervals'

export const useFocusedDuration = () => {
  const intervals = useAssertFocusIntervals()

  const now = useRhythmicRerender()

  return useMemo(
    () =>
      getSetsDuration(
        focusIntervalsToSets({
          intervals,
          now,
        }),
      ),
    [intervals, now],
  )
}
