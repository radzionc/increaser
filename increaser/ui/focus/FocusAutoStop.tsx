import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay } from 'date-fns'
import { useFocus } from './FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'

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
      },
    })
  }, [focusDuration, setDayEndsAt, startedAt, stop])

  useEffect(() => {
    const now = Date.now()

    if (now > setDayEndsAt) {
      autoStop()
      return
    }

    const duration = now - startedAt
    if (duration > convertDuration(4, 'h', 'ms')) {
      autoStop()
      return
    }

    if (stoppedBeingVisibleAt && startedBeingVisibleAt) {
      const staleDuration = startedBeingVisibleAt - stoppedBeingVisibleAt
      if (
        staleDuration > convertDuration(1, 'h', 'ms') &&
        duration > convertDuration(2, 'h', 'ms')
      ) {
        autoStop()
        return
      }
    }
  }, [
    autoStop,
    setDayEndsAt,
    startedAt,
    startedBeingVisibleAt,
    stoppedBeingVisibleAt,
  ])

  return null
}
