import { useCallback } from 'react'
import { useFocusIntervals } from '../state/focusIntervals'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { usePresentState } from '@lib/ui/state/usePresentState'

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
