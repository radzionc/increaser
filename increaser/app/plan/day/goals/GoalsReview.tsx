import { VStack } from '@lib/ui/layout/Stack'
import { ActiveGoals } from '../../../goals/ActiveGoals'

export const GoalsReview = () => (
  <VStack gap={40}>
    <ActiveGoals />
  </VStack>
)
