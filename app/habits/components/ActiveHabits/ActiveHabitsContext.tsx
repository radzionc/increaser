import { createContext } from 'react'
import { createContextHook } from 'shared/utils/createContextHook'

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
