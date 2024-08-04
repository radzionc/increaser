import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isToday } from 'date-fns'
import { createContext, useMemo } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getDaySets } from '@increaser/app/sets/helpers/getDaySets'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'

interface DayOverviewContextState {
  sets: Set[]
  currentTime: number

  startHour: number
  endHour: number
}

const DayOverviewContext = createContext<DayOverviewContextState | undefined>(
  undefined,
)

export const useDayOverview = createContextHook(
  DayOverviewContext,
  'DayOverview',
)

export const DayOverviewProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const currentTime = useRhythmicRerender()
  const [weekday] = useSelectedWeekday()

  const dayStartedAt = useStartOfWeekday(weekday)

  const { session } = useFocus()

  const { sets: allSets } = useAssertUserState()

  const sets = useMemo(() => {
    const result = getDaySets(allSets, dayStartedAt)
    if (session && isToday(dayStartedAt)) {
      const { intervals } = session
      const sets = focusIntervalsToSets({
        intervals,
        now: currentTime,
      })
      result.push(...sets)
    }

    return result
  }, [allSets, currentTime, dayStartedAt, session])

  const { startWorkAt, finishWorkAt } = useAssertUserState()

  const startHour = useMemo(() => {
    if (sets.length) {
      return Math.floor(
        convertDuration(sets[0].start - dayStartedAt, 'ms', 'h'),
      )
    }

    return Math.min(
      Math.floor(convertDuration(startWorkAt, 'min', 'h')),
      convertDuration(currentTime - dayStartedAt, 'ms', 'h'),
    )
  }, [currentTime, dayStartedAt, startWorkAt, sets])

  const endHour = useMemo(() => {
    const workdayEndsAtHour = Math.ceil(
      convertDuration(finishWorkAt, 'min', 'h'),
    )
    if (!sets.length) {
      return workdayEndsAtHour
    }

    const lastSetEnd = getLastItem(sets).end

    return Math.max(
      workdayEndsAtHour,
      Math.ceil(convertDuration(lastSetEnd - dayStartedAt, 'ms', 'h')),
    )
  }, [dayStartedAt, finishWorkAt, sets])

  return (
    <DayOverviewContext.Provider
      value={{
        sets,
        currentTime,
        startHour,
        endHour,
      }}
    >
      {children}
    </DayOverviewContext.Provider>
  )
}
