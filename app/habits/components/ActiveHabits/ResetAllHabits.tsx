import { useResetAllHabitsMutation } from 'habits/api/useResetAllHabitsMutation'
import { useMemo } from 'react'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { range } from '@increaser/utils/range'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { Text } from '@increaser/ui/ui/Text'
import { MS_IN_DAY } from 'utils/time'

import { useHabits } from '../HabitsProvider'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

const minInactiveDays = 3

export const ResetAllHabits = () => {
  const { habits } = useHabits()
  const todayStartedAt = useStartOfDay()

  const { mutate: resetAllHabits } = useResetAllHabitsMutation()

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
      <ShyTextButton onClick={resetAllHabits} text="Reset all habits" />
    </Text>
  )
}
