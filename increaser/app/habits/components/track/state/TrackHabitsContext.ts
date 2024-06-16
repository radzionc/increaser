import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'

export type HabitDay = {
  startedAt: number
  completion: Record<string, null | boolean>
}

export type TrackHabitsState = {
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
