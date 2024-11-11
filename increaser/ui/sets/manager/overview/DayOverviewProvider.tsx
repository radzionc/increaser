import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { createContext, useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'
import { useLastSetsSnapshot } from '../../hooks/useLastSetsSnapshot'
import { useSets } from '../../hooks/useSets'

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

  const allSets = useSets()

  const sets = useMemo(
    () =>
      getDaySets(allSets, dayStartedAt).map((set) => {
        const result: DayOverviewSet = { ...set }

        if (set.start > lastSetsSnapshot) {
          result.isImmutable = `This session cannot be edited or deleted because it is from the previous month.`
        }

        if (set.isActive) {
          result.isImmutable = `This session can't be edited or deleted because it's in progress.`
        }

        return result
      }),
    [allSets, dayStartedAt, lastSetsSnapshot],
  )

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
