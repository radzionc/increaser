import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

type TimeTrackingSliceProps = {
  titleAs?: React.ElementType
}

export const TimeTrackingSlice = ({ titleAs }: TimeTrackingSliceProps) => {
  const id = 'trackTime'

  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader titleAs={titleAs} {...getDemoSliceCopy(id)} />
        <ClientOnly>
          <TrackedTimeProvider>
            <VStack style={{ maxWidth: 920, width: '100%' }}>
              <TrackedTimeReport />
            </VStack>
          </TrackedTimeProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
