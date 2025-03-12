import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { TrackHabits } from '@product/ui/habits/TrackHabits'

import { DemoGuard } from '../../demo/DemoGuard'

export const HabitsSlice = () => {
  const id = 'habits'
  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Build <strong>Habits</strong> That Shape Your Future
        </WebsiteSectionTitle>
        <DemoGuard>
          <TrackHabits />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
