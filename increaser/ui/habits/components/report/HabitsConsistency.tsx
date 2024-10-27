import { getHabitPassedDays } from '@increaser/entities-utils/habit/getHabitPassedDays'

import { useActiveHabits } from '@increaser/ui/habits/hooks/useActiveHabits'
import { VStack } from '@lib/ui/css/stack'
import { HabitConsistency } from './HabitConsistency'
import { HabitColumnLabel } from './HabitColumnLabel'

export const HabitsConsistency = () => {
  const habits = useActiveHabits()

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
