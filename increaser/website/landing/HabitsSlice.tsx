import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { productName } from '@increaser/config'

export const HabitsSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Your Success Starts with Your Habits"
          subtitle={`Embrace the journey of self-improvement with ${productName}'s intuitive habit tracking.`}
        />
        <Scoreboard />
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
