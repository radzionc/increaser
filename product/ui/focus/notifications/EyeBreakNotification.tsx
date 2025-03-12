import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useEffect, useState } from 'react'

import { useAssertFocusIntervals } from '../state/focusIntervals'

import { useShowFocusNotificationMutation } from './hooks/useShowFocusNotificationMutation'
import { eyeBreakNotificationInterval } from './state/focusNotifications'

export const EyeBreakNotification = () => {
  const { mutate: notify } = useShowFocusNotificationMutation('eyeBreak')

  const intervals = useAssertFocusIntervals()

  const [lastBreakAt, setLastBreakAt] = useState(
    () => getLastItem(shouldBePresent(intervals)).start,
  )

  const targetAt =
    lastBreakAt + convertDuration(eyeBreakNotificationInterval, 'min', 'ms')

  useEffect(() => {
    const now = Date.now()
    if (now > targetAt) return

    const targetIn = targetAt - now

    const timeout = setTimeout(() => {
      const now = Date.now()
      const isTooLate = now > targetAt + convertDuration(1, 'min', 'ms')
      if (isTooLate) return

      setLastBreakAt(now)
      notify()
    }, targetIn)

    return () => clearTimeout(timeout)
  }, [notify, targetAt])

  return null
}
