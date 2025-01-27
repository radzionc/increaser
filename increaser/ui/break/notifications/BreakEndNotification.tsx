import { useEffect } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { showNotification } from '@lib/ui/notifications/utils'
import { speak } from '@lib/ui/notifications/utils/speak'
import { attempt } from '@lib/utils/attempt'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

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
