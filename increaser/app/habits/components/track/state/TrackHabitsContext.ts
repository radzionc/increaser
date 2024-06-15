import { HabitDay } from '../../ActiveHabits/HabitDay'
import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'

export type HabitDay = {
  startedAt: number
  completion: Record<string, null | boolean>
}

export type TrackHabitsState = {
  days: HabitDay[]
}

export const TrackHabitsContext = createContext<TrackHabitsState | undefined>(
  undefined,
)

export const useTrackHabits = createContextHook(
  TrackHabitsContext,
  'TrackHabitsContext',
)
