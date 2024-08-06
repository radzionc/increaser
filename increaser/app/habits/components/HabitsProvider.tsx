import { useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useTheme } from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { HabitsContext } from '@increaser/ui/habits/HabitsContext'
import { enhanceHabit } from '@increaser/ui/habits/utils/enhanceHabit'
import { useTrackHabitMutation } from '@increaser/ui/habits/api/useTrackHabitMutation'

export const HabitsProvider = ({ children }: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const state = useAssertUserState()
  const { mutate } = useTrackHabitMutation()

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
        trackHabit: mutate,
      }}
    >
      {children}
    </HabitsContext.Provider>
  )
}
