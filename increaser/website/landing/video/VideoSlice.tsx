import { productName } from '@increaser/config'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import {
  InfoYouTubeVideo,
  infoYouTubeVideos,
} from '@increaser/info/infoYouTubeVideos'
import { useState } from 'react'
import { VideoSliceContent } from './VideoSliceContent'

export const VideoSlice = () => {
  const [value, setValue] = useState<InfoYouTubeVideo>('focus')

  const url = infoYouTubeVideos[value]

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
