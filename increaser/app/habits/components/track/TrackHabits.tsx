import { TrackHabitsProvider } from './TrackHabitsProvider'
import { HabitColumns } from './HabitColumns'
import { HabitsTableContainer } from './HabitsTableContainer'

export const TrackHabits = () => (
  <HabitsTableContainer>
    <TrackHabitsProvider>
      <HabitColumns />
    </TrackHabitsProvider>
  </HabitsTableContainer>
)
