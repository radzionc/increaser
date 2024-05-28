import { useEffect, useMemo, useState } from 'react'
import { useCurrentFocus } from './CurrentFocusProvider'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { endOfDay } from 'date-fns'
import { useFocus } from './FocusContext'

export const FocusAutoStop = () => {
  const { startedAt } = useCurrentFocus()
  const { stop } = useFocus()

  const [lastFocusAt, setLastFocusAt] = useState<number>(Date.now())
  const now = useRhythmicRerender()

  const setDayEndsAt = useMemo(() => endOfDay(startedAt).getTime(), [startedAt])

  useEffect(() => {
    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        setLastFocusAt(Date.now())
      }
    }

    document.addEventListener('visibilitychange', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleFocus)
    }
  }, [])

  useEffect(() => {
    if (Date.now() > setDayEndsAt) {
      stop({
        setOverride: {
          end: setDayEndsAt,
        },
      })
    }
  }, [lastFocusAt, now, setDayEndsAt, stop])

  return null
}
