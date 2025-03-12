import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useStopFocus } from '@product/ui/focus/hooks/useStopFocus'
import { useAssertFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import { useEffect } from 'react'

const maxPausedDuration = convertDuration(30, 'min', 'ms')

export const PausedFocusAutoStop = () => {
  const intervals = useAssertFocusIntervals()

  const stop = useStopFocus()

  const pausedAt = shouldBePresent(getLastItem(intervals).end)

  useEffect(() => {
    const now = Date.now()
    const stopIn = pausedAt + maxPausedDuration - now
    if (stopIn < 0) {
      stop()
      return
    }

    const timeout = setTimeout(() => stop(), stopIn)

    return () => clearTimeout(timeout)
  }, [pausedAt, stop])

  return null
}
