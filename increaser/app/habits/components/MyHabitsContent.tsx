import { useMyHabitsView } from './MyHabitsView'
import { Match } from '@lib/ui/base/Match'
import { ManageHabits } from './manage/ManageHabits'
import { TrackHabits } from './track/TrackHabits'

export const MyHabitsContent = () => {
  const [view] = useMyHabitsView()

  return (
    <Match
      value={view}
      track={() => <TrackHabits />}
      manage={() => <ManageHabits />}
    />
  )
}
