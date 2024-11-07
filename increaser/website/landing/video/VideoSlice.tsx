import YouTubePlayer from 'react-player/lazy'
import { productName } from '@increaser/config'
import { HStack, VStack } from '@lib/ui/css/stack'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { productTools } from '@increaser/entities/ProductTool'
import { ProductToolOption } from '../../navigation/features/ProductToolOption'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import {
  InfoYouTubeVideo,
  infoYouTubeVideos,
} from '@increaser/info/infoYouTubeVideos'
import { useState } from 'react'
import { VideoNavigation } from './VideoNavigation'

const youTubeVideoRatio = 9 / 16

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('mistExtra')};

  overflow: hidden;
`

export const VideoSlice = () => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)
  const [value, setValue] = useState<InfoYouTubeVideo>('focus')

  const url = infoYouTubeVideos[value]

  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`Unveiling the Power of ${productName}`}
          subtitle="Dive into an insightful demonstration and see how our app transforms your workday efficiency"
        />
        <IntersectionAware<HTMLDivElement>
          render={({ ref, wasIntersected }) => (
            <HStack ref={ref} fullWidth gap={20}>
              <VideoNavigation value={value} onChange={setValue} />

              {wasIntersected && (
                <ElementSizeAware
                  render={({ setElement, size }) => {
                    return (
                      <VideoWrapper ref={setElement}>
                        {size && (
                          <YouTubePlayer
                            isActive
                            width={size.width}
                            height={size.width * youTubeVideoRatio}
                            url={url}
                            playing={isPlaying}
                            onPause={pause}
                            onPlay={play}
                            config={{
                              youtube: {
                                playerVars: { autoplay: 0, controls: 1 },
                              },
                            }}
                          />
                        )}
                      </VideoWrapper>
                    )
                  }}
                />
              )}
            </HStack>
          )}
        />
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
