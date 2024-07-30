import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { useCurrentFocus } from '../CurrentFocusProvider'
import { focusIntervalsToSets } from '../utils/focusIntervalsToSets'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useMemo } from 'react'

export const useFocusedDuration = () => {
  const { intervals } = useCurrentFocus()

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
