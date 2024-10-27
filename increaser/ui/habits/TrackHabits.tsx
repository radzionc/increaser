import { HStack } from '@lib/ui/css/stack'
import { HabitColumns } from './components/track/HabitColumns'
import { HabitsTableContainer } from './components/track/HabitsTableContainer'
import { TrackHabitsProvider } from './components/track/TrackHabitsProvider'
import { HabitsConsistency } from './components/report/HabitsConsistency'
import { HabitsStreak } from './components/report/HabitsStreak'

export const TrackHabits = () => {
  return (
    <HabitsTableContainer>
      <HStack gap={40}>
        <HabitsConsistency />
        <HabitsStreak />
        <TrackHabitsProvider>
          <HabitColumns />
        </TrackHabitsProvider>
      </HStack>
    </HabitsTableContainer>
  )
}
