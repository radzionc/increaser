import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { TrackHabits } from '@increaser/ui/habits/TrackHabits'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'

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
