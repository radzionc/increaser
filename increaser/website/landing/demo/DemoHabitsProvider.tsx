import { useCallback, useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useTheme } from 'styled-components'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { HabitsContext } from '@increaser/ui/habits/HabitsContext'
import { enhanceHabit } from '@increaser/ui/habits/utils/enhanceHabit'
import { recordMap } from '@lib/utils/record/recordMap'
import { TrackHabitInput } from '@increaser/app/habits/api/useTrackHabitMutation'

export const DemoHabitsProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const { habits } = useAssertUserState()

  const { updateState } = useUserState()
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

  const trackHabit = useCallback(
    async (input: TrackHabitInput) => {
      updateState({
        habits: recordMap(habits, (habit) => {
          if (habit.id === input.id) {
            const { successes } = habit
            return {
              ...habit,
              successes: input.value
                ? [...successes, input.date]
                : successes.filter((d) => d !== input.date),
            }
          }

          return habit
        }),
      })
    },
    [habits, updateState],
  )

  return (
    <HabitsContext.Provider
      value={{
        habits: enhancedHabits,
        trackHabit,
      }}
    >
      {children}
    </HabitsContext.Provider>
  )
}
