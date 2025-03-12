import { ResetHabitsPrompt } from '@product/ui/habits/components/track/reset/ResetHabitsPrompt'

import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'

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
