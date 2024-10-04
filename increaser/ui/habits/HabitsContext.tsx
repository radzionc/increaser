import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EnhancedHabit } from './EnhancedHabit'

interface HabitsState {
  habits: EnhancedHabit[]
}

export const HabitsContext = createContext<HabitsState | undefined>(undefined)

export const useHabits = createContextHook(HabitsContext, 'HabitsContext')
