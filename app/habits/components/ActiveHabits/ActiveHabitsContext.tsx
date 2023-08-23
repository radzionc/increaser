import { createContext } from 'react'
import { createContextHook } from '@increaser/ui/state/createContextHook'

interface ActiveHabitsState {
  isReadonly: boolean
}

export const ActiveHabitsContext = createContext<ActiveHabitsState | undefined>(
  undefined,
)

export const useActiveHabits = createContextHook(
  ActiveHabitsContext,
  'ActiveHabitContext',
)
