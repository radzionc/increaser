import YouTubePlayer from 'react-player/lazy'
import { demoVideoUrl, productName } from '@increaser/config'
import { VStack } from '@lib/ui/layout/Stack'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { VideoHighlight } from '@lib/ui/website/VideoHighlight'

const youTubeVideoRatio = 9 / 16

export const VideoSlice = () => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`Unveiling the Power of ${productName}`}
          subtitle="Dive into an insightful demonstration and see how our app transforms your workday efficiency"
        />
        <IntersectionAware<HTMLDivElement>
          render={({ ref, wasIntersected }) => {
            return (
              <VStack fullWidth ref={ref}>
                {wasIntersected && (
                  <ElementSizeAware
                    render={({ setElement, size }) => {
                      return (
                        <VideoHighlight isActive={isPlaying} ref={setElement}>
                          {size && (
                            <YouTubePlayer
                              isActive
                              width={size.width}
                              height={size.width * youTubeVideoRatio}
                              url={demoVideoUrl}
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
                        </VideoHighlight>
                      )
                    }}
                  />
                )}
              </VStack>
            )
          }}
        />
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
