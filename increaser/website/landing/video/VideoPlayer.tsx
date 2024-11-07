import YouTubePlayer from 'react-player/lazy'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentWithValueProps } from '@lib/ui/props'
import { mergeRefs } from '@lib/ui/utils/mergeRefs'

const youTubeVideoRatio = 9 / 16

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('mistExtra')};

  overflow: hidden;
`

export const VideoPlayer = ({ value }: ComponentWithValueProps<string>) => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <IntersectionAware<HTMLDivElement>
      render={({ ref, wasIntersected }) => (
        <ElementSizeAware<HTMLDivElement>
          render={({ setElement, size }) => {
            return (
              <VideoWrapper ref={mergeRefs(setElement, ref)}>
                {size && wasIntersected && (
                  <YouTubePlayer
                    isActive
                    width={size.width}
                    height={size.width * youTubeVideoRatio}
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
    />
  )
}
