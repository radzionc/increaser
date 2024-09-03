import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { VStack } from '@lib/ui/css/stack'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'

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
          <VStack style={{ maxWidth: 920, width: '100%' }}>
            <TrackedTimeReport />
          </VStack>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
