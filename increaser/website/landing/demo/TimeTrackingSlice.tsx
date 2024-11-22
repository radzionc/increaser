import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { VStack } from '@lib/ui/css/stack'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { DemoGuard } from '../../demo/DemoGuard'
import { TimeGroupingProvider } from '@increaser/ui/projects/trackedTimeReport/timeGrouping/state'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'

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
