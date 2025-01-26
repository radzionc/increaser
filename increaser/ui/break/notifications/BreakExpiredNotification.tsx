import { useEffect } from 'react'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { range } from '@lib/utils/array/range'
import { MS_IN_MIN, MS_IN_SEC } from '@lib/utils/time'
import { showNotification } from '@lib/ui/notifications/utils'
import { speak } from '@lib/ui/notifications/utils/speak'
import { attempt } from '@lib/utils/attempt'
import { useBreakNotificationsHaveSound } from './state/breakNotificationsHaveSound'
import { pluralize } from '@lib/utils/pluralize'

const REMINDERS_COUNT = 5

export const BreakExpiredNotification = () => {
  const lastSetEnd = useLastSetEnd()
  const [hasSound] = useBreakNotificationsHaveSound()

  useEffect(() => {
    if (!lastSetEnd) return

    const now = Date.now()
    const timeouts = range(REMINDERS_COUNT)
      .map((reminderNumber) => lastSetEnd + (reminderNumber + 1) * MS_IN_MIN)
      .filter((time) => time > now)
      .map((time) =>
        setTimeout(() => {
          const now = Date.now()
          if (now < time - 5 * MS_IN_SEC || now > time + 5 * MS_IN_SEC) return

          const minutes = Math.round((now - lastSetEnd) / MS_IN_MIN)
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
