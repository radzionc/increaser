import { HStack, VStack } from '@lib/ui/layout/Stack'
import { MyHabitsViewSelector } from './MyHabitsView'
import { MyHabitsContent } from './MyHabitsContent'
import { ResetHabitsPrompt } from './track/reset/ResetHabitsPrompt'

export const MyHabits = () => (
  <VStack gap={20}>
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={20}
      wrap="wrap"
    >
      <MyHabitsViewSelector />
      <ResetHabitsPrompt />
    </HStack>
    <MyHabitsContent />
  </VStack>
)
