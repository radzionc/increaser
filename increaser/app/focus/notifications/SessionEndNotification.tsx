import { useFocus } from '@increaser/ui/focus/FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useEffect, useMemo } from 'react'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { sum } from '@lib/utils/array/sum'
import { useShowFocusNotificationMutation } from './hooks/useShowFocusNotificationMutation'

export const SessionEndNotification = () => {
  const { focusDuration, intervals } = useFocus()

  const { mutate: notify } = useShowFocusNotificationMutation('sessionEnd')

  const sessionEndsAt = useMemo(() => {
    const previousIntervals = shouldBePresent(intervals).slice(0, -1)
    const workedDuration = sum(
      previousIntervals.map(({ start, end }) =>
        getIntervalDuration({ start, end: shouldBePresent(end) }),
      ),
    )

    const { start } = getLastItem(shouldBePresent(intervals))

    return start + convertDuration(focusDuration, 'min', 'ms') - workedDuration
  }, [intervals, focusDuration])

  useEffect(() => {
    const now = Date.now()
    if (now > sessionEndsAt) return

    const sessionEndsIn = sessionEndsAt - now

    const timeout = setTimeout(() => {
      const now = Date.now()
      const isTooLate = now > sessionEndsAt + convertDuration(1, 'min', 'ms')
      if (isTooLate) return

      notify()
    }, sessionEndsIn)

    return () => clearTimeout(timeout)
  }, [notify, sessionEndsAt])

  return null
}
