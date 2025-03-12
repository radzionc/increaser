import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { PersistentStateKey } from '@product/ui/state/persistentState'
import { usePersistentState } from '@product/ui/state/persistentState'
import { useCallback } from 'react'

import { useFocusIntervals } from '../../../focus/state/focusIntervals'
import { BreakDuration } from '../BreakDuration'

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
