import { TrackHabitsProvider } from './TrackHabitsProvider'
import { HabitColumns } from './HabitColumns'
import { HabitsTableContainer } from './HabitsTableContainer'
import { PageHeaderControlsArea } from '../../../ui/page/header/PageHeaderControlsAreaProvider'
import { ResetHabitsPrompt } from './reset/ResetHabitsPrompt'

export const TrackHabits = () => {
  return (
    <HabitsTableContainer>
      <PageHeaderControlsArea>
        <ResetHabitsPrompt />
      </PageHeaderControlsArea>
      <TrackHabitsProvider>
        <HabitColumns />
      </TrackHabitsProvider>
    </HabitsTableContainer>
  )
}
