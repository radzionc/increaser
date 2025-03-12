import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@product/config'

import { ApiProvider } from '../api/ApiProvider'

import { Scoreboard } from './Scoreboard'

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
