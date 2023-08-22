import { pluralize } from '@increaser/utils/pluralize'
import { ZapIcon } from '@increaser/ui/ui/icons/ZapIcon'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { HabitStatistic } from './HabitStatistic'

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
