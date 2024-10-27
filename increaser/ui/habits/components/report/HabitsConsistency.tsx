import { getHabitPassedDays } from '@increaser/entities-utils/habit/getHabitPassedDays'

import { VStack } from '@lib/ui/css/stack'
import { HabitConsistency } from './HabitConsistency'
import { HabitColumnLabel } from './HabitColumnLabel'
import { useOrderedActiveHabits } from '../../hooks/useOrderedActiveHabits'

export const HabitsConsistency = () => {
  const habits = useOrderedActiveHabits()

  return (
    <VStack alignItems="center">
      <HabitColumnLabel>%</HabitColumnLabel>
      {habits.map(({ id, successes, startedAt }) => {
        const passedDays = getHabitPassedDays({ successes, startedAt })
        const value = passedDays === 0 ? 0 : successes.length / passedDays

        return <HabitConsistency key={id} value={value} />
      })}
    </VStack>
  )
}
