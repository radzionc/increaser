import { pluralize } from '@lib/utils/pluralize'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'

import { HabitStatistic } from './HabitStatistic'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'

export const HabitStreak = () => {
  const habit = useCurrentHabit()
  const isAlert = habit.passedDays.length > 0 && habit.streak === 0

  return (
    <HabitStatistic
      value={pluralize(habit.streak, 'day')}
      name="streak"
      kind={isAlert ? 'alert' : 'regular'}
      icon={<ZapIcon />}
    />
  )
}
