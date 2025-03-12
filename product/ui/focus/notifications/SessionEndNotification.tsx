import { getLastItem } from '@lib/utils/array/getLastItem'
import { sum } from '@lib/utils/array/sum'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useEffect, useMemo } from 'react'

import { useFocusDuration } from '../state/focusDuration'
import { useAssertFocusIntervals } from '../state/focusIntervals'

import { useShowFocusNotificationMutation } from './hooks/useShowFocusNotificationMutation'

export const SessionEndNotification = () => {
  const [focusDuration] = useFocusDuration()

  const intervals = useAssertFocusIntervals()

  const { mutate: notify } = useShowFocusNotificationMutation('sessionEnd')

  const sessionEndsAt = useMemo(() => {
    const previousIntervals = intervals.slice(0, -1)
    const workedDuration = sum(
      previousIntervals.map(({ start, end }) =>
        getIntervalDuration({ start, end: shouldBePresent(end) }),
      ),
    )

    const { start } = getLastItem(intervals)

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
