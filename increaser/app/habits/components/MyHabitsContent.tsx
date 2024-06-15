import { useMyHabitsView } from './MyHabitsView'
import { Match } from '@lib/ui/base/Match'
import { ManageHabits } from './manage/ManageHabits'
import { TrackHabits } from './track/TrackHabits'
import { VStack } from '@lib/ui/layout/Stack'
import { HabitsReport } from './report/HabitsReport'

export const MyHabitsContent = () => {
  const [view] = useMyHabitsView()

  return (
    <Match
      value={view}
      track={() => (
        <VStack gap={40}>
          <TrackHabits />
          <HabitsReport />
        </VStack>
      )}
      manage={() => <ManageHabits />}
    />
  )
}
