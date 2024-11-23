import { useMemo } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'

import { Interval } from '@lib/utils/interval/Interval'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay, startOfHour } from 'date-fns'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { CurrentIntervalContext } from '@lib/ui/state/currentInterval'

export const StartTimeEditorIntervalProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const interval: Interval = useMemo(() => {
    const end = startOfHour(now).getTime() + convertDuration(1, 'h', 'ms')

    const todayStartedAt = startOfDay(now).getTime()

    const start = Math.max(todayStartedAt, end - convertDuration(2, 'h', 'ms'))

    return { start, end }
  }, [now])

  return (
    <CurrentIntervalContext.Provider value={interval}>
      {children}
    </CurrentIntervalContext.Provider>
  )
}
