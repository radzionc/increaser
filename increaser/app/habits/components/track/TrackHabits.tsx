import { TrackHabitsProvider } from './TrackHabitsProvider'
import { HabitColumns } from './HabitColumns'
import { HabitsTableContainer } from './HabitsTableContainer'
import { PageHeaderControlsArea } from '../../../ui/page/header/PageHeaderControlsAreaProvider'
import { ResetHabitsPrompt } from './reset/ResetHabitsPrompt'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { useEffect } from 'react'

export const TrackHabits = () => {
  const { mutate } = useUpdateUserMutation()
  useEffect(() => {
    mutate({
      viewedHabitsAt: Date.now(),
    })
  }, [mutate])

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
