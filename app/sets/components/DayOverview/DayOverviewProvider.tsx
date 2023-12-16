import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { isToday } from 'date-fns'
import { useFocus } from 'focus/hooks/useFocus'
import { createContext, useEffect, useMemo, useState } from 'react'
import { startOfDay } from 'date-fns'
import { useAssertUserState } from 'user/state/UserStateContext'
import { getDaySets } from 'sets/helpers/getDaySets'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { convertDuration } from '@increaser/utils/time/convertDuration'

interface DayOverviewContextState {
  sets: Set[]
  currentTime: number

  startHour: number
  endHour: number

  dayStartedAt: number
  setCurrentDay: (timestamp: number) => void
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
  const todayStartedAt = useStartOfDay()
  const [currentDay, setCurrentDay] = useState(todayStartedAt)

  const dayStartedAt = startOfDay(currentDay).getTime()

  const { currentSet } = useFocus()
  useEffect(() => {
    if (currentSet && dayStartedAt !== todayStartedAt) {
      setCurrentDay(todayStartedAt)
    }
  }, [currentSet, dayStartedAt, todayStartedAt])

  const { sets: allSets } = useAssertUserState()

  const sets = useMemo(() => {
    const result = getDaySets(allSets, dayStartedAt)
    if (currentSet && isToday(dayStartedAt)) {
      result.push({
        start: currentSet.startedAt,
        end: currentTime,
        projectId: currentSet.projectId,
      })
    }

    return result
  }, [allSets, currentSet, currentTime, dayStartedAt])

  const { goalToStartWorkAt, goalToFinishWorkBy } = useAssertUserState()

  const startHour = useMemo(() => {
    if (sets.length) {
      return Math.floor(
        convertDuration(sets[0].start - dayStartedAt, 'ms', 'h'),
      )
    }

    return Math.min(
      Math.floor(convertDuration(goalToStartWorkAt, 'min', 'h')),
      convertDuration(currentTime - dayStartedAt, 'ms', 'h'),
    )
  }, [currentTime, dayStartedAt, goalToStartWorkAt, sets])

  const endHour = useMemo(() => {
    const workdayEndsAtHour = Math.ceil(
      convertDuration(goalToFinishWorkBy, 'min', 'h'),
    )
    if (!sets.length) {
      return workdayEndsAtHour
    }

    const lastSetEnd = getLastItem(sets).end

    return Math.max(
      workdayEndsAtHour,
      Math.ceil(convertDuration(lastSetEnd - dayStartedAt, 'ms', 'h')),
    )
  }, [dayStartedAt, goalToFinishWorkBy, sets])

  return (
    <DayOverviewContext.Provider
      value={{
        sets,
        currentTime,
        startHour,
        endHour,
        dayStartedAt,
        setCurrentDay,
      }}
    >
      {children}
    </DayOverviewContext.Provider>
  )
}
