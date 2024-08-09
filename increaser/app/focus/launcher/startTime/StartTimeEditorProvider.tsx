import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext, useMemo } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'

import { Interval } from '@lib/utils/interval/Interval'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay, startOfHour } from 'date-fns'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'

type StartTimeEditorState = {
  interval: Interval
  now: number
}

const StartTimeEditorContext = createContext<StartTimeEditorState | undefined>(
  undefined,
)

export const useStartTimeEditor = createContextHook(
  StartTimeEditorContext,
  'StartTimeEditor',
)

export const StartTimeEditorProvider = ({
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
    <StartTimeEditorContext.Provider value={{ interval, now }}>
      {children}
    </StartTimeEditorContext.Provider>
  )
}
