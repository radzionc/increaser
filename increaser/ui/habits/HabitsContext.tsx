import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EnhancedHabit } from './EnhancedHabit'
import { TrackHabitInput } from '@increaser/app/habits/api/useTrackHabitMutation'

interface HabitsState {
  habits: EnhancedHabit[]
  trackHabit: (input: TrackHabitInput) => void
}

export const HabitsContext = createContext<HabitsState | undefined>(undefined)

export const useHabits = createContextHook(HabitsContext, 'HabitsContext')
