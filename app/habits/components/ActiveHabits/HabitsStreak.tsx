import { useMemo } from 'react'
import { pluralize } from 'shared/utils/pluralize'
import { ZapIcon } from '@increaser/ui/ui/icons/ZapIcon'

import { useHabits } from '../HabitsProvider'
import { HabitStatistic } from './HabitStatistic'

export const HabitsStreak = () => {
  const { habits } = useHabits()

  const streak = useMemo(() => {
    const completeStreaks: number[] = []
    const uncompleteStreaks: number[] = []

    habits.forEach((habit) => {
      if (habit.passedDays.length > habit.streak) {
        uncompleteStreaks.push(habit.streak)
      } else {
        completeStreaks.push(habit.streak)
      }
    })

    if (uncompleteStreaks.length > 0) {
      return Math.min(...uncompleteStreaks)
    }

    if (completeStreaks.length > 0) {
      return Math.max(...completeStreaks)
    }

    return 0
  }, [habits])

  const isAlert =
    streak === 0 && habits.some(({ passedDays }) => passedDays.length > 0)

  return (
    <HabitStatistic
      value={pluralize(streak, 'day')}
      name="streak"
      kind={isAlert ? 'alert' : 'regular'}
      icon={<ZapIcon />}
    />
  )
}
