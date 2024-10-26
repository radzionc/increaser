import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EntityWithStartDate } from '@lib/utils/entities/EntityWithStartDate'

export type HabitDay = EntityWithStartDate & {
  completion: Record<string, null | boolean>
}

type TrackHabitsState = {
  days: HabitDay[]
  activeDayStartedAt: number
  setActiveDayStartedAt: (startedAt: number) => void
}

export const TrackHabitsContext = createContext<TrackHabitsState | undefined>(
  undefined,
)

export const useTrackHabits = createContextHook(
  TrackHabitsContext,
  'TrackHabitsContext',
)
