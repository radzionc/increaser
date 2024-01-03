import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContext, useMemo } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { startOfDay } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { range } from '@lib/utils/array/range'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { createContextHook } from '@lib/ui/state/createContextHook'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/app/state/persistentState'

export interface SetsExplorerDay {
  startedAt: number
  sets: Set[]
}

interface SetsExplorerState {
  days: SetsExplorerDay[]
  startHour: number
  endHour: number

  includesToday: boolean
  setIncludesToday: (value: boolean) => void
}

const SetsExplorerContext = createContext<SetsExplorerState | undefined>(
  undefined,
)

export const SetsExplorerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { sets, startWorkAt, finishWorkAt } = useAssertUserState()
  const [includesToday, setIncludesToday] = usePersistentState(
    PersistentStateKey.IncludeTodayInSetsExplorer,
    false,
  )

  const days = useMemo(() => {
    const todayStartedAt = startOfDay(Date.now()).getTime()
    const firstDayStartedAt = startOfDay(sets[0].start).getTime()
    const daysCount =
      Math.round(
        convertDuration(todayStartedAt - firstDayStartedAt, 'ms', 'd'),
      ) + 1

    const result: SetsExplorerDay[] = range(daysCount).map((dayIndex) => {
      const startedAt = firstDayStartedAt + convertDuration(dayIndex, 'd', 'ms')
      return {
        startedAt,
        sets: [],
      }
    })
    sets.forEach((set) => {
      const setDayStartedAt = startOfDay(set.start).getTime()
      const dayIndex = result.findIndex(
        ({ startedAt }) => startedAt >= setDayStartedAt,
      )
      result[dayIndex].sets.push(set)
    })

    if (includesToday) return result

    return result.slice(0, -1)
  }, [includesToday, sets])

  const [startHour, endHour] = useMemo(() => {
    const daysWithSets = days.filter(({ sets }) => sets.length > 0)
    return [
      Math.min(
        Math.floor(convertDuration(startWorkAt, 'min', 'h')),
        ...daysWithSets.map(({ sets, startedAt }) => {
          return Math.floor(
            convertDuration(sets[0].start - startedAt, 'ms', 'h'),
          )
        }),
      ),
      Math.max(
        Math.ceil(convertDuration(finishWorkAt, 'min', 'h')),
        ...daysWithSets.map(({ sets, startedAt }) => {
          return Math.ceil(
            convertDuration(getLastItem(sets).end - startedAt, 'ms', 'h'),
          )
        }),
      ),
    ]
  }, [days, finishWorkAt, startWorkAt])

  return (
    <SetsExplorerContext.Provider
      value={{ days, startHour, endHour, includesToday, setIncludesToday }}
    >
      {children}
    </SetsExplorerContext.Provider>
  )
}

export const useSetsExplorer = createContextHook(
  SetsExplorerContext,
  'SetsExplorerContext',
)
