import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'

type TimeTrackingSliceProps = {
  titleAs?: React.ElementType
}

export const TimeTrackingSlice = ({ titleAs }: TimeTrackingSliceProps) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        titleAs={titleAs}
        {...getDemoSliceCopy('trackTime')}
      />
      <ClientOnly>
        <TrackedTimeProvider>
          <TrackedTimeReportProvider>
            <VStack style={{ maxWidth: 920, width: '100%' }}>
              <TrackedTimeReport />
            </VStack>
          </TrackedTimeReportProvider>
        </TrackedTimeProvider>
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
