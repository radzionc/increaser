import { Set } from '@increaser/entities/User'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'
import { getDaySets } from '../../sets/helpers/getDaySets'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export type TrackTimeState = {
  weekday: number
  projectId: string
}

type TrackedTimeContextState = TrackTimeState & {
  sets: Set[]
  dayInterval: Interval
  setState: Dispatch<SetStateAction<TrackTimeState>>
}

const TrackedTimeContext = createContext<TrackedTimeContextState | undefined>(
  undefined,
)

export const useTrackTime = createContextHook(TrackedTimeContext, 'TrackTime')

export const TrackTimeProvider = ({ children }: ComponentWithChildrenProps) => {
  const currentWeekday = useWeekday()
  const { activeProjects } = useProjects()
  const [state, setState] = useState<TrackTimeState>({
    weekday: currentWeekday,
    projectId: activeProjects[0].id,
  })

  const { weekday } = state

  const currentWeekSets = useCurrentWeekSets()
  const weekStartedAt = useStartOfWeek()

  const dayInterval = useMemo(() => {
    const start = weekStartedAt + convertDuration(weekday, 'd', 'ms')
    const end =
      weekday === currentWeekday
        ? Date.now()
        : start + convertDuration(1, 'd', 'ms')

    return { start, end }
  }, [currentWeekday, weekStartedAt, weekday])

  const sets = useMemo(() => {
    return getDaySets(currentWeekSets, dayInterval.start)
  }, [currentWeekSets, dayInterval.start])

  return (
    <TrackedTimeContext.Provider
      value={{ ...state, dayInterval, sets, setState }}
    >
      {children}
    </TrackedTimeContext.Provider>
  )
}
