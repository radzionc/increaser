import { VStack } from '@lib/ui/css/stack'

import { CurrentHabitProvider } from '../../CurrentHabitProvider'
import { useOrderedActiveHabits } from '../../hooks/useOrderedActiveHabits'

import { HabitColumnLabel } from './HabitColumnLabel'
import { HabitConsistency } from './HabitConsistency'

export const HabitsConsistency = () => {
  const habits = useOrderedActiveHabits()

  return (
    <VStack alignItems="center">
      <HabitColumnLabel>%</HabitColumnLabel>
      {habits.map((value) => {
        return (
          <CurrentHabitProvider key={value.id} value={value}>
            <HabitConsistency />
          </CurrentHabitProvider>
        )
      })}
    </VStack>
  )
}
