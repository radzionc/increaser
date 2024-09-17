import { convertDuration } from '@lib/utils/time/convertDuration'
import { useEffect } from 'react'

import { useShowFocusNotificationMutation } from './hooks/useShowFocusNotificationMutation'
import { useWorkDayEndsAt } from '@increaser/ui/schedule/hooks/useWorkDayEndsAt'
import { workdayEndNotificationTime } from './state/focusNotifications'

export const WorkDayEndNotification = () => {
  const { mutate: notify } = useShowFocusNotificationMutation('workDayEnd')

  const targetAt =
    useWorkDayEndsAt() -
    convertDuration(workdayEndNotificationTime, 'min', 'ms')

  useEffect(() => {
    const now = Date.now()
    if (now > targetAt) return

    const targetIn = targetAt - now

    const timeout = setTimeout(() => {
      const now = Date.now()
      const isTooLate = now > targetAt + convertDuration(1, 'min', 'ms')
      if (isTooLate) return

      notify()
    }, targetIn)

    return () => clearTimeout(timeout)
  })

  return null
}
