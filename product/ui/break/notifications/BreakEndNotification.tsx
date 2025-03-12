import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { showNotification } from '@lib/ui/notifications/utils'
import { speak } from '@lib/ui/notifications/utils/speak'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { attempt } from '@lib/utils/attempt'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { useEffect } from 'react'

import { useBreakDuration } from '../duration/state/useBreakDuration'

import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'

export const BreakEndNotification = () => {
  const [breakDuration] = usePresentState(useBreakDuration())
  const lastSetEnd = shouldBePresent(useLastSetEnd())
  const [hasSound] = useBreakNotificationsHaveSound()

  const now = useRhythmicRerender()

  useEffect(() => {
    const breakEnd = lastSetEnd + convertDuration(breakDuration, 'min', 'ms')

    if (breakEnd <= now) return

    const timeout = setTimeout(() => {
      const now = Date.now()
      const isTooLate = now > breakEnd + convertDuration(1, 'min', 'ms')
      if (isTooLate) return

      const text = `The ${breakDuration}-minute break is over!`
      showNotification(text)
      if (hasSound) {
        attempt(() => speak(text), undefined)
      }
    }, breakEnd - now)

    return () => clearTimeout(timeout)
  }, [breakDuration, lastSetEnd, hasSound, now])

  return null
}
