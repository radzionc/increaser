import { useStopFocus } from '@increaser/app/focus/hooks/useStopFocus'
import { useAssertFocusIntervals } from '@increaser/app/focus/state/focusIntervals'
import { useEffect, useMemo } from 'react'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const LongFocusAutoStop = () => {
  const intervals = useAssertFocusIntervals()

  const target = useMemo(
    () =>
      shouldBePresent(getLastItem(intervals).end) +
      convertDuration(3, 'h', 'ms'),
    [intervals],
  )

  const stop = useStopFocus()

  useEffect(() => {
    const now = Date.now()
    const stopIn = target - now

    const autoStop = () => {
      stop({
        lastSetOverride: {
          end: target,
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
