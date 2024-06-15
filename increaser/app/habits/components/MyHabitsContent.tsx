import { useMyHabitsView } from './MyHabitsView'
import { Match } from '@lib/ui/base/Match'
import { ManageHabits } from './manage/ManageHabits'
import { TrackHabits } from './track/TrackHabits'
import { HabitsReport } from './report/HabitsReport'

export const MyHabitsContent = () => {
  const [view] = useMyHabitsView()

  return (
    <Match
      value={view}
      manage={() => <ManageHabits />}
      track={() => <TrackHabits />}
      report={() => <HabitsReport />}
    />
  )
}
