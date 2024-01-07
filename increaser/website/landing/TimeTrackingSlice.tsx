import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { TimeDistributionPanel } from '@increaser/ui/timeTracking/TimeDistributionPanel'

export const TimeTrackingSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Time Well Spent, Goals Well Achieved"
          subtitle={`With ${productName}, time tracking and management become your superpowers`}
        />
        <ClientOnly>
          <TimeDistributionPanel />
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
