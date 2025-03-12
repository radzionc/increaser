import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'
import { useAssertFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import { useMemo } from 'react'

import { focusIntervalsToSets } from '../utils/focusIntervalsToSets'

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
