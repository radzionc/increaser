import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@product/config'

import { VideoSliceContent } from './VideoSliceContent'

export const VideoSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`Unveiling the Power of ${productName}`}
          subtitle="Dive into an insightful demonstration and see how our app transforms your workday efficiency"
        />
        <VideoSliceContent />
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
