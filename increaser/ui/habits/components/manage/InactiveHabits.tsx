import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { HabitItem } from './HabitItem'
import { useInactiveHabits } from '../../hooks/useInactiveHabits'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Text } from '@lib/ui/text'
import { CurrentHabitProvider } from '../../CurrentHabitProvider'

export const InactiveHabits = () => {
  const habits = useInactiveHabits()

  const [, setActiveItemId] = useActiveItemId()

  if (isEmpty(habits)) {
    return null
  }

  return (
    <VStack gap={8}>
      <Text color="supporting">Inactive habits</Text>
      <VStack>
        {habits.map((habit) => (
          <CurrentHabitProvider key={habit.id} value={habit}>
            <HabitItem onClick={() => setActiveItemId(habit.id)} />
          </CurrentHabitProvider>
        ))}
      </VStack>
    </VStack>
  )
}
