import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay } from 'date-fns'
import { useFocus } from './FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { shouldSetAutoStop } from './utils/shouldSetAutoStop'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'

export const FocusAutoStop = () => {
  const { startedAt } = useCurrentFocus()
  const { stop, focusDuration } = useFocus()

  const [startedBeingVisibleAt, setStartedBeingVisibleAt] = useState<number>(
    Date.now(),
  )
  const [stoppedBeingVisibleAt, setStoppedBeingVisibleAt] = useState<
    number | null
  >(null)

  const setDayEndsAt = useMemo(() => endOfDay(startedAt).getTime(), [startedAt])

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
    const end = Math.min(
      setDayEndsAt,
      startedAt + convertDuration(focusDuration, 'min', 'ms'),
    )

    stop({
      setOverride: {
        end,
        isEndEstimated: true,
      },
    })
  }, [focusDuration, setDayEndsAt, startedAt, stop])

  const now = useRhythmicRerender()
  useEffect(() => {
    if (
      shouldSetAutoStop({
        setDayEndsAt,
        startedAt,
        stoppedBeingVisibleAt,
        startedBeingVisibleAt,
        now: Date.now(),
      })
    ) {
      autoStop()
    }
  }, [
    now,
    autoStop,
    setDayEndsAt,
    startedAt,
    startedBeingVisibleAt,
    stoppedBeingVisibleAt,
  ])

  return null
}
