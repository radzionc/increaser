import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { HabitConsistency } from './HabitConsistency'
import { HabitStreak } from './HabitStreak'

export const HabitAnalytics = () => {
  return (
    <Text as="div" size={14}>
      <HStack gap={12} alignItems="center">
        <HabitStreak />
        <HabitConsistency />
      </HStack>
    </Text>
  )
}
