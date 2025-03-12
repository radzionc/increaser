import { ChildrenProp } from '@lib/ui/props'
import { CurrentIntervalContext } from '@lib/ui/state/currentInterval'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Interval } from '@lib/utils/interval/Interval'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useLastSet } from '@product/app/sets/hooks/useLastSet'
import { startOfHour, endOfDay } from 'date-fns'
import { useMemo } from 'react'

export const AutoStoppedSetIntervalProvider = ({ children }: ChildrenProp) => {
  const lastSet = shouldBePresent(useLastSet())

  const interval: Interval = useMemo(() => {
    const start = startOfHour(lastSet.start).getTime()

    const end = Math.min(
      startOfHour(lastSet.end).getTime() + convertDuration(2, 'h', 'ms'),
      endOfDay(lastSet.start).getTime(),
    )

    return { start, end }
  }, [lastSet.end, lastSet.start])

  return (
    <CurrentIntervalContext.Provider value={interval}>
      {children}
    </CurrentIntervalContext.Provider>
  )
}
