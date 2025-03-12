import { VStack } from '@lib/ui/css/stack'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { TimeGroupingProvider } from '@product/ui/projects/trackedTimeReport/timeGrouping/state'
import { TrackedTimeReport } from '@product/ui/projects/trackedTimeReport/TrackedTimeReport'

import { DemoGuard } from '../../demo/DemoGuard'

export const TimeTrackingSlice = () => {
  const id = 'trackTime'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Gain Insight with Powerful <strong>Time Tracking</strong>
        </WebsiteSectionTitle>
        <VStack style={{ maxWidth: 920, width: '100%' }}>
          <DemoGuard>
            <TimeGroupingProvider value="week">
              <TrackedTimeReport />
            </TimeGroupingProvider>
          </DemoGuard>
        </VStack>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
