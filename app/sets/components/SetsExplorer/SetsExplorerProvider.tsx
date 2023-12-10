import { Set } from '@increaser/entities/User'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContext, useMemo } from 'react'
import { useAssertUserState } from 'user/state/UserStateContext'
import { startOfDay } from 'date-fns'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { createContextHook } from '@increaser/ui/state/createContextHook'

export interface SetsExplorerDay {
  startedAt: number
  sets: Set[]
}

interface SetsExplorerState {
  days: SetsExplorerDay[]
  startHour: number
  endHour: number
}

const SetsExplorerContext = createContext<SetsExplorerState | undefined>(
  undefined,
)

export const SetsExplorerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { sets, goalToStartWorkAt, goalToFinishWorkBy } = useAssertUserState()

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

    return result
  }, [sets])

  const [startHour, endHour] = useMemo(() => {
    const daysWithSets = days.filter(({ sets }) => sets.length > 0)
    return [
      Math.min(
        Math.floor(convertDuration(goalToStartWorkAt, 'min', 'h')),
        ...daysWithSets.map(({ sets, startedAt }) => {
          return Math.floor(
            convertDuration(sets[0].start - startedAt, 'ms', 'h'),
          )
        }),
      ),
      Math.max(
        Math.ceil(convertDuration(goalToFinishWorkBy, 'min', 'h')),
        ...daysWithSets.map(({ sets, startedAt }) => {
          return Math.ceil(
            convertDuration(getLastItem(sets).end - startedAt, 'ms', 'h'),
          )
        }),
      ),
    ]
  }, [days, goalToFinishWorkBy, goalToStartWorkAt])

  return (
    <SetsExplorerContext.Provider value={{ days, startHour, endHour }}>
      {children}
    </SetsExplorerContext.Provider>
  )
}

export const useSetsExplorer = createContextHook(
  SetsExplorerContext,
  'SetsExplorerContext',
)
