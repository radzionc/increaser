import { Habit } from '@increaser/app/habits/Habit'
import { toHabit } from '@increaser/app/habits/helpers/toHabit'
import { createContext, useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { useTheme } from 'styled-components'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'
import { order } from '@lib/utils/array/order'

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
        'asc',
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
