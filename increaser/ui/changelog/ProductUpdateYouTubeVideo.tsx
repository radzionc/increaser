import { ValueProp } from '@lib/ui/props'

import { VStack } from '@lib/ui/css/stack'

import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import YouTubePlayer from 'react-player/lazy'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { widescreenRatio } from '@lib/ui/video/config'

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('mistExtra')};

  overflow: hidden;
`

export const ProductUpdateYouTubeVideo = ({ value }: ValueProp<string>) => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <IntersectionAware<HTMLDivElement>
      render={({ ref, wasIntersected }) => (
        <VStack fullWidth ref={ref}>
          {wasIntersected && (
            <ElementSizeAware
              render={({ setElement, size }) => {
                return (
                  <VideoWrapper ref={setElement}>
                    {size && (
                      <YouTubePlayer
                        isActive
                        width={size.width}
                        height={size.width / widescreenRatio}
                        url={value}
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
        </VStack>
      )}
    />
  )
}
