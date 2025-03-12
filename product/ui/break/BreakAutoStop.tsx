import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { useEffect } from 'react'

import { breakDurations } from './duration/BreakDuration'
import { useBreakDuration } from './duration/state/useBreakDuration'

export const BreakAutoStop = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()

  const lastSetEnd = useLastSetEnd()

  const now = useRhythmicRerender()

  useEffect(() => {
    if (!breakDuration) {
      return
    }

    if (!lastSetEnd) {
      return
    }

    const duration = now - lastSetEnd

    const maxDuration = Math.max(...breakDurations) + 10

    if (duration > convertDuration(maxDuration, 'min', 'ms')) {
      setBreakDuration(null)
    }
  }, [breakDuration, lastSetEnd, now, setBreakDuration])

  return null
}
