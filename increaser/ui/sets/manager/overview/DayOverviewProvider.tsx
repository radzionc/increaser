import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isToday } from 'date-fns'
import { createContext, useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'
import { useLastSetsSnapshot } from '../../hooks/useLastSetsSnapshot'
import { useFocusIntervals } from '@increaser/app/focus/state/focusIntervals'

export type DayOverviewSet = Set & {
  isImmutable?: string
}

interface DayOverviewContextState {
  sets: DayOverviewSet[]
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

  const lastSetsSnapshot = useLastSetsSnapshot()

  const [intervals] = useFocusIntervals()

  const { sets: allSets } = useUser()

  const sets = useMemo(() => {
    const result: DayOverviewSet[] = getDaySets(allSets, dayStartedAt).map(
      (set) => ({
        ...set,
        isImmutable:
          set.start > lastSetsSnapshot
            ? undefined
            : `This session cannot be edited or deleted because it is from the previous month.`,
      }),
    )
    if (intervals && isToday(dayStartedAt)) {
      const sets = focusIntervalsToSets({
        intervals,
        now: currentTime,
      }).map((set) => ({
        ...set,
        isImmutable: `This session can't be edited or deleted because it's in progress.`,
      }))
      result.push(...sets)
    }

    return result
  }, [allSets, currentTime, dayStartedAt, intervals, lastSetsSnapshot])

  const { finishWorkAt } = useUser()

  const startHour = useMemo(() => {
    if (sets.length) {
      return Math.floor(
        convertDuration(sets[0].start - dayStartedAt, 'ms', 'h'),
      )
    }

    return Math.min(convertDuration(currentTime - dayStartedAt, 'ms', 'h'))
  }, [currentTime, dayStartedAt, sets])

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
