import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay } from 'date-fns'
import { useFocus } from './FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { shouldSetAutoStop } from './utils/shouldSetAutoStop'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getIntervalsGapsDuration } from './utils/getIntervalsGapsDuration'

export const FocusAutoStop = () => {
  const { intervals } = useCurrentFocus()
  const { stop, focusDuration } = useFocus()

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

  const autoStop = useCallback(() => {
    const endOptions = [setDayEndsAt, Date.now()]
    if (getLastItem(intervals).end === null) {
      const gapsDuration = getIntervalsGapsDuration(intervals)
      endOptions.push(
        start + convertDuration(focusDuration, 'min', 'ms') + gapsDuration,
      )
    }
    const end = Math.min(...endOptions)

    stop({
      lastSetOverride: {
        end,
        isEndEstimated: true,
      },
    })
  }, [focusDuration, intervals, setDayEndsAt, start, stop])

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
      autoStop()
    }
  }, [
    autoStop,
    intervals,
    now,
    setDayEndsAt,
    startedBeingVisibleAt,
    stoppedBeingVisibleAt,
  ])

  return null
}
