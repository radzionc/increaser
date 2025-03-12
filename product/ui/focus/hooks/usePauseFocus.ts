import { usePresentState } from '@lib/ui/state/usePresentState'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { useCallback } from 'react'

import { useFocusIntervals } from '../state/focusIntervals'

export const usePauseFocus = () => {
  const [, setIntervals] = usePresentState(useFocusIntervals())

  return useCallback(() => {
    const end = Date.now()

    setIntervals((prev) => {
      return updateAtIndex(prev, prev.length - 1, (interval) => ({
        ...interval,
        end,
      }))
    })
  }, [setIntervals])
}
