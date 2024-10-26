import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'
import { useMemo } from 'react'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'

export const useHabitTrackingDaysCount = () => {
  const firstDayStartedAt = useStartOfDay()
  const habits = useOrderedHabits()

  return useMemo(() => {
    const firstHabitStartedAt = Math.min(
      ...habits.map((habit) => habit.startedAt),
    )
    const lastDayStartedAt = startOfDay(firstHabitStartedAt).getTime()
    return (
      Math.round(
        convertDuration(firstDayStartedAt - lastDayStartedAt, 'ms', 'd'),
      ) + 1
    )
  }, [firstDayStartedAt, habits])
}
