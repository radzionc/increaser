import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { ActiveHabits } from './ActiveHabits'
import { CheckTodayHabitsCard } from './CheckTodayHabitsCard'
import { CheckYesterdayHabits } from './CheckYesterdayHabits'

export const MyHabits = () => (
  <UniformColumnGrid
    style={{ alignItems: 'start' }}
    gap={40}
    maxColumns={2}
    minChildrenWidth={320}
  >
    <VStack gap={20}>
      <CheckTodayHabitsCard />
      <CheckYesterdayHabits />
    </VStack>
    <ActiveHabits />
  </UniformColumnGrid>
)
