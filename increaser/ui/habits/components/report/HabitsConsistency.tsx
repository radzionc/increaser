import { VStack } from '@lib/ui/css/stack'
import { HabitConsistency } from './HabitConsistency'
import { HabitColumnLabel } from './HabitColumnLabel'
import { useOrderedActiveHabits } from '../../hooks/useOrderedActiveHabits'
import { CurrentHabitProvider } from '../../CurrentHabitProvider'

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
