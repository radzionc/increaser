import { useStopFocus } from '@increaser/app/focus/hooks/useStopFocus'
import { useAssertFocusIntervals } from '@increaser/app/focus/state/focusIntervals'
import { useEffect, useMemo } from 'react'
import { endOfDay } from 'date-fns'

export const MidnightFocusAutoStop = () => {
  const intervals = useAssertFocusIntervals()

  const midnightAt = useMemo(
    () => endOfDay(intervals[0].start).getTime(),
    [intervals],
  )

  const stop = useStopFocus()

  useEffect(() => {
    const now = Date.now()
    const stopIn = midnightAt - now

    const autoStop = () => {
      stop({
        lastSetOverride: {
          end: midnightAt,
          isEndEstimated: true,
        },
      })
    }

    if (stopIn < 0) {
      autoStop()
      return
    }

    const timeout = setTimeout(autoStop, stopIn)

    return () => clearTimeout(timeout)
  })

  return null
}
