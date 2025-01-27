import { useEffect } from 'react'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { range } from '@lib/utils/array/range'
import { showNotification } from '@lib/ui/notifications/utils'
import { speak } from '@lib/ui/notifications/utils/speak'
import { attempt } from '@lib/utils/attempt'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'
import { pluralize } from '@lib/utils/pluralize'
import { remindersCount } from './state/breakNotifications'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { isInInterval } from '@lib/utils/interval/isInInterval'

export const BreakExpiredNotification = () => {
  const lastSetEnd = useLastSetEnd()
  const [hasSound] = useBreakNotificationsHaveSound()

  useEffect(() => {
    if (!lastSetEnd) return

    const now = Date.now()
    const timeouts = range(remindersCount)
      .map(
        (reminderNumber) =>
          lastSetEnd + convertDuration(reminderNumber + 1, 'min', 'ms'),
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
            attempt(() => speak(text), undefined)
          }
        }, time - now),
      )

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [lastSetEnd, hasSound])

  return null
}
