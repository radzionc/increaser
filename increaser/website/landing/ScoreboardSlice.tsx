import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { productName } from '@increaser/config'
import { ApiProvider } from '../api/ApiProvider'

export const ScoreboardSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Join the Productivity Elite"
          subtitle={`Claim your spot among the ${productName} high achievers`}
        />
        <ApiProvider>
          <Scoreboard />
        </ApiProvider>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
