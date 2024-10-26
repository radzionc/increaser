import { HabitColumns } from './components/track/HabitColumns'
import { HabitsTableContainer } from './components/track/HabitsTableContainer'
import { TrackHabitsProvider } from './components/track/TrackHabitsProvider'

export const TrackHabits = () => {
  return (
    <HabitsTableContainer>
      <TrackHabitsProvider>
        <HabitColumns />
      </TrackHabitsProvider>
    </HabitsTableContainer>
  )
}
