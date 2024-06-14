import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { ActiveHabits } from './ActiveHabits'
import { CheckTodayHabitsCard } from './CheckTodayHabitsCard'
import { CheckYesterdayHabits } from './CheckYesterdayHabits'
import { useMyHabitsView } from './MyHabitsView'
import { Match } from '@lib/ui/base/Match'
import { ManageHabits } from './manage/ManageHabits'

export const MyHabitsContent = () => {
  const [view] = useMyHabitsView()

  return (
    <Match
      value={view}
      track={() => (
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
      )}
      manage={() => <ManageHabits />}
    />
  )
}
