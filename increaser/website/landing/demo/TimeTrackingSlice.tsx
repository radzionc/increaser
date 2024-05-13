import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { VStack } from '@lib/ui/layout/Stack'

export const TimeTrackingSlice = () => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Time Well Spent, Goals Well Achieved"
        subtitle={`With ${productName}, time tracking and management become your superpowers`}
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
