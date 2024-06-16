import { TrackHabitsProvider } from './TrackHabitsProvider'
import { HabitColumns } from './HabitColumns'
import { HabitsTableContainer } from './HabitsTableContainer'

export const TrackHabits = () => {
  return (
    <HabitsTableContainer>
      <TrackHabitsProvider>
        <HabitColumns />
      </TrackHabitsProvider>
    </HabitsTableContainer>
  )
}
