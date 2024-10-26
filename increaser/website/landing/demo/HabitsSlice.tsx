import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { TrackHabits } from '@increaser/ui/habits/TrackHabits'

export const HabitsSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'habits'
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <TrackHabits />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
