import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'
import { BreakDuration } from '../BreakDuration'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useCallback } from 'react'
import { useFocusIntervals } from '../../../focus/state/focusIntervals'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'

export const useBreakDuration = () => {
  const [intervals] = useFocusIntervals()
  const lastSetEnd = useLastSetEnd()

  return useStateCorrector(
    usePersistentState<BreakDuration | null>(
      PersistentStateKey.BreakDuration,
      null,
    ),
    useCallback(
      (duration) => {
        if (intervals) {
          return null
        }

        if (!lastSetEnd) {
          return null
        }

        return duration
      },
      [intervals, lastSetEnd],
    ),
  )
}
