import { useEffect, useMemo, useState } from 'react'
import { endOfDay } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { shouldSetAutoStop } from './utils/shouldSetAutoStop'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getIntervalsGapsDuration } from './utils/getIntervalsGapsDuration'
import { useFocusDuration } from '@increaser/app/focus/state/focusDuration'
import { useAssertFocusIntervals } from '@increaser/app/focus/state/focusIntervals'
import { useStopFocus } from '@increaser/app/focus/hooks/useStopFocus'

export const FocusAutoStop = () => {
  const intervals = useAssertFocusIntervals()
  const [focusDuration] = useFocusDuration()

  const stop = useStopFocus()
  const { start } = intervals[0]

  const [startedBeingVisibleAt, setStartedBeingVisibleAt] = useState<number>(
    Date.now(),
  )
  const [stoppedBeingVisibleAt, setStoppedBeingVisibleAt] = useState<
    number | null
  >(null)

  const setDayEndsAt = useMemo(() => endOfDay(start).getTime(), [start])

  useEffect(() => {
    const handleFocus = () => {
      const handler =
        document.visibilityState === 'visible'
          ? setStartedBeingVisibleAt
          : setStoppedBeingVisibleAt
      handler(Date.now())
    }

    document.addEventListener('visibilitychange', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleFocus)
    }
  }, [])

  const now = useRhythmicRerender()
  useEffect(() => {
    if (
      shouldSetAutoStop({
        setDayEndsAt,
        startedAt: getLastItem(intervals).start,
        stoppedBeingVisibleAt,
        startedBeingVisibleAt,
        now,
      })
    ) {
      const endOptions = [setDayEndsAt, Date.now()]
      const gapsDuration = getIntervalsGapsDuration(intervals)
      endOptions.push(
        start + convertDuration(focusDuration, 'min', 'ms') + gapsDuration,
      )
      const end = Math.min(...endOptions)

      stop({
        lastSetOverride: {
          end,
          isEndEstimated: true,
        },
      })
    }
  }, [
    focusDuration,
    intervals,
    now,
    setDayEndsAt,
    start,
    startedBeingVisibleAt,
    stop,
    stoppedBeingVisibleAt,
  ])

  return null
}
