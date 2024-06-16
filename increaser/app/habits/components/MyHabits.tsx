import { VStack } from '@lib/ui/layout/Stack'
import { MyHabitsViewSelector } from './MyHabitsView'
import { MyHabitsContent } from './MyHabitsContent'

export const MyHabits = () => (
  <VStack gap={20}>
    <MyHabitsViewSelector />
    <MyHabitsContent />
  </VStack>
)
