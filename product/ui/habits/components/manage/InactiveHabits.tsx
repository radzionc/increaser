import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { Text } from '@lib/ui/text'
import { isEmpty } from '@lib/utils/array/isEmpty'

import { CurrentHabitProvider } from '../../CurrentHabitProvider'
import { useInactiveHabits } from '../../hooks/useInactiveHabits'

import { HabitItem } from './HabitItem'

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
