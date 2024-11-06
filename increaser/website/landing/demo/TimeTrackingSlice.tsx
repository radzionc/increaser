import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { VStack } from '@lib/ui/css/stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { DemoGuard } from '../../demo/DemoGuard'
import { TimeGroupingProvider } from '@increaser/ui/projects/trackedTimeReport/timeGrouping/state'

type TimeTrackingSliceProps = {
  titleAs?: React.ElementType
}

export const TimeTrackingSlice = ({ titleAs }: TimeTrackingSliceProps) => {
  const id = 'trackTime'

  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader titleAs={titleAs} {...getDemoSliceCopy(id)} />
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
