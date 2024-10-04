import { useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useTheme } from 'styled-components'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { HabitsContext } from '@increaser/ui/habits/HabitsContext'
import { enhanceHabit } from '@increaser/ui/habits/utils/enhanceHabit'

export const HabitsProvider = ({ children }: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const state = useUser()

  const theme = useTheme()

  const habits = useMemo(
    () =>
      order(
        Object.values(state.habits).map((habit) =>
          enhanceHabit(habit, todayStartedAt, theme),
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
