import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useStopFocus } from '@product/ui/focus/hooks/useStopFocus'
import { useAssertFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import { endOfDay } from 'date-fns'
import { useEffect, useMemo } from 'react'

export const FocusAutoStop = () => {
  const intervals = useAssertFocusIntervals()

  const target = useMemo(() => {
    return Math.min(
      shouldBePresent(getLastItem(intervals).start) +
        convertDuration(3, 'h', 'ms'),
      endOfDay(intervals[0].start).getTime(),
    )
  }, [intervals])

  const stop = useStopFocus()

  useEffect(() => {
    const now = Date.now()
    const stopIn = target - now

    const autoStop = () => {
      stop({
        end: target,
        isEndEstimated: true,
      })
    }

    if (stopIn < 0) {
      autoStop()
      return
    }

    const timeout = setTimeout(autoStop, stopIn)

    return () => clearTimeout(timeout)
  }, [stop, target])

  return null
}
