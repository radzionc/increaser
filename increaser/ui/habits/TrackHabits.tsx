import { HabitColumns } from '@increaser/app/habits/components/track/HabitColumns'
import { HabitsTableContainer } from '@increaser/app/habits/components/track/HabitsTableContainer'
import { TrackHabitsProvider } from '@increaser/app/habits/components/track/TrackHabitsProvider'
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
      <TrackHabitsProvider>
        <HabitColumns />
      </TrackHabitsProvider>
    </HabitsTableContainer>
  )
}
