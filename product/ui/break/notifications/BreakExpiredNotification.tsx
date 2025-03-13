import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { showNotification } from '@lib/ui/notifications/utils'
import { speak } from '@lib/ui/notifications/utils/speak'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { range } from '@lib/utils/array/range'
import { attempt } from '@lib/utils/attempt'
import { isInInterval } from '@lib/utils/interval/isInInterval'
import { pluralize } from '@lib/utils/pluralize'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { useEffect } from 'react'

import { useBreakDuration } from '../duration/state/useBreakDuration'

import { remindersCount } from './state/breakNotifications'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'

export const BreakExpiredNotification = () => {
  const lastSetEnd = useLastSetEnd()
  const [hasSound] = useBreakNotificationsHaveSound()
  const [breakDuration] = usePresentState(useBreakDuration())

  const now = useRhythmicRerender()

  useEffect(() => {
    if (!lastSetEnd) return

    const timeouts = range(remindersCount)
      .map(
        (index) =>
          lastSetEnd + convertDuration(breakDuration + index + 1, 'min', 'ms'),
      )
      .filter((time) => time > now)
      .map((time) =>
        setTimeout(() => {
          const now = Date.now()
          const offset = convertDuration(5, 's', 'ms')
          const interval = { start: time - offset, end: time + offset }
          if (!isInInterval(interval, now)) return

          const minutes = Math.round(
            convertDuration(now - lastSetEnd, 'ms', 'min'),
          )

          const text = `The break started ${pluralize(minutes, 'minute')} ago`

          showNotification(text)
          if (hasSound) {
            attempt(() => speak(text))
          }
        }, time - now),
      )

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [breakDuration, hasSound, lastSetEnd, now])

  return null
}
