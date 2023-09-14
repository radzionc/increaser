import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { MS_IN_MIN } from '@increaser/utils/time'
import { startOfHour, endOfHour, isToday } from 'date-fns'
import { useFocus } from 'focus/hooks/useFocus'
import { createContext, useMemo } from 'react'
import { startOfDay } from 'date-fns'
import { useAssertUserState } from 'user/state/UserStateContext'
import { getDaySets } from 'sets/helpers/getDaySets'

interface DayOverviewContextState {
  sets: Set[]
  currentTime: number
  timelineStartsAt: number
  timelineEndsAt: number
  workdayEndsAt: number
  dayStartedAt: number
}

const DayOverviewContext = createContext<DayOverviewContextState | undefined>(
  undefined,
)

interface DayOverviewProviderProps extends ComponentWithChildrenProps {
  dayTimestamp: number
}

export const DayOverviewProvider = ({
  children,
  dayTimestamp,
}: DayOverviewProviderProps) => {
  const currentTime = useRhythmicRerender()

  const dayStartedAt = startOfDay(dayTimestamp ?? currentTime).getTime()

  const { currentSet } = useFocus()
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

  const workdayEndsAt = dayStartedAt + goalToFinishWorkBy * MS_IN_MIN

  const timelineStartsAt = useMemo(() => {
    if (sets.length) {
      return startOfHour(sets[0].start).getTime()
    }

    const workdayStartsAt = dayStartedAt + goalToStartWorkAt * MS_IN_MIN

    if (currentTime < workdayStartsAt) {
      return startOfHour(currentTime).getTime()
    }

    return workdayStartsAt
  }, [currentTime, dayStartedAt, goalToStartWorkAt, sets])

  const timelineEndsAt = useMemo(() => {
    if (!sets.length) {
      return workdayEndsAt
    }
    const lastSetEnd = getLastItem(sets).end
    if (workdayEndsAt > lastSetEnd) {
      return workdayEndsAt
    }

    return endOfHour(lastSetEnd).getTime()
  }, [sets, workdayEndsAt])

  return (
    <DayOverviewContext.Provider
      value={{
        sets,
        currentTime,
        timelineStartsAt,
        timelineEndsAt,
        workdayEndsAt,
        dayStartedAt,
      }}
    >
      {children}
    </DayOverviewContext.Provider>
  )
}

export const useDayOverview = createContextHook(
  DayOverviewContext,
  'DayOverview',
)
