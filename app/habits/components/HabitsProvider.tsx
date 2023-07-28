import { Habit } from 'habits/Habit'
import { toHabit } from 'habits/helpers/toHabit'
import { createContext, useMemo } from 'react'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from 'shared/props'
import { createContextHook } from 'shared/utils/createContextHook'
import { useTheme } from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'

interface HabitsState {
  habits: Habit[]
}

export const HabitsContext = createContext<HabitsState | undefined>(undefined)

export const HabitsProvider = ({ children }: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const state = useAssertUserState()

  const theme = useTheme()

  const habits = useMemo(
    () =>
      state.habits
        .map((habit) => toHabit(habit, todayStartedAt, theme))
        .sort((one, another) => one.order - another.order),
    [state.habits, theme, todayStartedAt],
  )

  return (
    <HabitsContext.Provider
      value={{
        habits,
      }}
    >
      {children}
    </HabitsContext.Provider>
  )
}

export const useHabits = createContextHook(HabitsContext, 'HabitsContext')
