import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { ResetHabitsPrompt } from '@increaser/ui/habits/components/track/reset/ResetHabitsPrompt'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { useEffect } from 'react'
import { TrackHabits } from '@increaser/ui/habits/TrackHabits'

export const TrackHabitsPage = () => {
  const { mutate } = useUpdateUserMutation()
  useEffect(() => {
    mutate({
      viewedHabitsAt: Date.now(),
    })
  }, [mutate])

  return (
    <>
      <PageHeaderControlsArea>
        <ResetHabitsPrompt />
      </PageHeaderControlsArea>
      <TrackHabits />
    </>
  )
}
