import { useMemo } from 'react'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { range } from '@increaser/utils/array/range'
import { ShyTextButton } from '@increaser/ui/buttons/ShyTextButton'
import { Text } from '@increaser/ui/text'
import { MS_IN_DAY } from '@increaser/utils/time'

import { useHabits } from '../HabitsProvider'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

const minInactiveDays = 3

export const ResetAllHabits = () => {
  const { habits } = useHabits()
  const todayStartedAt = useStartOfDay()

  const habitDates = range(minInactiveDays)
    .map((index) => todayStartedAt - index * MS_IN_DAY)
    .map((ts) => toHabitDate(new Date(ts)))

  const hasNoProgress = useMemo(
    () =>
      habits.every(
        (habit) =>
          habitDates.every((date) => !habit.successesSet.has(date)) &&
          habit.passedDays.length > minInactiveDays,
      ),
    [habitDates, habits],
  )

  if (!hasNoProgress || !habits.length) return null

  return (
    <Text size={14} color="supporting">
      Do you want to start from scratch?{' '}
      <ShyTextButton onClick={console.log} text="Reset all habits" />
    </Text>
  )
}
