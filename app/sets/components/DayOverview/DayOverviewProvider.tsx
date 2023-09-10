import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { MS_IN_MIN } from '@increaser/utils/time'
import { startOfHour, endOfHour } from 'date-fns'
import { useFocus } from 'focus/hooks/useFocus'
import { createContext, useMemo } from 'react'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useAssertUserState } from 'user/state/UserStateContext'

interface DayOverviewContextState {
  sets: Set[]
  currentTime: number
  startsAt: number
  endsAt: number
  workdayEndsAt: number
}

const DayOverviewContext = createContext<DayOverviewContextState | undefined>(
  undefined,
)

export const DayOverviewProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const currentTime = useRhythmicRerender()
  const todaySets = useTodaySets()
  const { currentSet } = useFocus()

  const sets = useMemo(() => {
    const result = [...todaySets]
    if (currentSet) {
      result.push({
        start: currentSet.startedAt,
        end: currentTime,
        projectId: currentSet.projectId,
      })
    }

    return result
  }, [currentSet, currentTime, todaySets])

  const { goalToStartWorkAt, goalToFinishWorkBy } = useAssertUserState()

  const todayStartedAt = useStartOfDay()

  const workdayEndsAt = todayStartedAt + goalToFinishWorkBy * MS_IN_MIN

  const startsAt = useMemo(() => {
    if (sets.length) {
      return startOfHour(sets[0].start).getTime()
    }

    const workdayStartsAt = todayStartedAt + goalToStartWorkAt * MS_IN_MIN

    if (currentTime < workdayStartsAt) {
      return startOfHour(currentTime).getTime()
    }

    return workdayStartsAt
  }, [currentTime, goalToStartWorkAt, sets, todayStartedAt])

  const endsAt = useMemo(() => {
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
      value={{ sets, currentTime, startsAt, endsAt, workdayEndsAt }}
    >
      {children}
    </DayOverviewContext.Provider>
  )
}

export const useDayOverview = createContextHook(
  DayOverviewContext,
  'DayOverview',
)
