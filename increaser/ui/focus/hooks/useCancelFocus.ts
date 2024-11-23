import { useCallback } from 'react'
import { useFocusIntervals } from '../state/focusIntervals'

export const useCancelFocus = () => {
  const [, setIntervals] = useFocusIntervals()

  return useCallback(() => {
    setIntervals(null)
  }, [setIntervals])
}
