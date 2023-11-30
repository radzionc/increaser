import { Habit } from 'habits/Habit'
import { toHabit } from 'habits/helpers/toHabit'
import { createContext, useMemo } from 'react'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useTheme } from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'
import { order } from '@increaser/utils/array/order'

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
      order(
        Object.values(state.habits).map((habit) =>
          toHabit(habit, todayStartedAt, theme),
        ),
        (h) => h.order,
        'desc',
      ),
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
