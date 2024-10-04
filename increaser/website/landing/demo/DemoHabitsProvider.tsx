import { useCallback, useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useTheme } from 'styled-components'
import { order } from '@lib/utils/array/order'
import { HabitsContext } from '@increaser/ui/habits/HabitsContext'
import { enhanceHabit } from '@increaser/ui/habits/utils/enhanceHabit'
import { useUser } from '@increaser/ui/user/state/user'

export const DemoHabitsProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const { habits } = useUser()

  const theme = useTheme()

  const enhancedHabits = useMemo(
    () =>
      order(
        Object.values(habits).map((habit) =>
          enhanceHabit(habit, todayStartedAt, theme),
        ),
        (h) => h.order,
        'asc',
      ),
    [habits, theme, todayStartedAt],
  )

  return (
    <HabitsContext.Provider
      value={{
        habits: enhancedHabits,
      }}
    >
      {children}
    </HabitsContext.Provider>
  )
}
