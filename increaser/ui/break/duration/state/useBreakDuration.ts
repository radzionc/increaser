import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'
import { BreakDuration } from '../BreakDuration'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useCallback } from 'react'
import { useFocusIntervals } from '../../../focus/state/focusIntervals'

export const useBreakDuration = () => {
  const [intervals] = useFocusIntervals()

  return useStateCorrector(
    usePersistentState<BreakDuration | null>(
      PersistentStateKey.BreakDuration,
      null,
    ),
    useCallback(
      (duration) => {
        if (intervals && duration) {
          return null
        }

        return duration
      },
      [intervals],
    ),
  )
}
