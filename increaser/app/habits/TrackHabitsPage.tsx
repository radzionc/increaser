import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { ResetHabitsPrompt } from '@increaser/ui/habits/components/track/reset/ResetHabitsPrompt'
import { HabitsContent } from './HabitsContent'

export const TrackHabitsPage = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <ResetHabitsPrompt />
      </PageHeaderControlsArea>
      <HabitsContent />
    </>
  )
}
