import { useMemo } from 'react'
import { ChildrenProp } from '@lib/ui/props'

import { Interval } from '@lib/utils/interval/Interval'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay, startOfHour } from 'date-fns'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { CurrentIntervalContext } from '@lib/ui/state/currentInterval'
import { useAssertFocusIntervals } from '../../state/focusIntervals'

export const EndTimeEditorIntervalProvider = ({ children }: ChildrenProp) => {
  const intervals = useAssertFocusIntervals()
  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const focusStartedAt = useMemo(() => intervals[0].start, [intervals])

  const interval: Interval = useMemo(() => {
    const end = startOfHour(now).getTime() + convertDuration(1, 'h', 'ms')

    const start = Math.max(
      startOfDay(focusStartedAt).getTime(),
      startOfHour(focusStartedAt).getTime() - convertDuration(1, 'h', 'ms'),
    )

    return { start, end }
  }, [focusStartedAt, now])

  return (
    <CurrentIntervalContext.Provider value={interval}>
      {children}
    </CurrentIntervalContext.Provider>
  )
}
