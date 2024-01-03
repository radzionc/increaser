import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { EnhancedHabit } from './EnhancedHabit'

interface HabitsState {
  habits: EnhancedHabit[]
  trackHabit: (input: ApiInterface['trackHabit']['input']) => void
}

export const HabitsContext = createContext<HabitsState | undefined>(undefined)

export const useHabits = createContextHook(HabitsContext, 'HabitsContext')
