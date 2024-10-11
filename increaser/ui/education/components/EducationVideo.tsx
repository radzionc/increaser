import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'

import YouTubePlayer from 'react-player/lazy'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useBoolean } from '@lib/ui/hooks/useBoolean'

const VideoContainer = styled.div<ComponentWithActiveState>`
  overflow: hidden;
  width: 100%;
  background: ${getColor('foreground')};
  ${borderRadius.s};
  aspect-ratio: 16 / 9;
  border: 2px solid
    ${matchColor('isActive', {
      true: 'transparent',
      false: 'primary',
    })};
`

export const EducationVideo = ({ value }: ComponentWithValueProps<string>) => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <VideoContainer isActive={isPlaying} ref={setElement}>
          {size && (
            <YouTubePlayer
              loop
              url={value}
              width={size.width}
              height={size.height}
              volume={1}
              playing={isPlaying}
              onPlay={play}
              onPause={pause}
              config={{
                youtube: {
                  playerVars: {
                    controls: 1,
                    fs: 1,
                  },
                },
              }}
            />
          )}
        </VideoContainer>
      )}
    />
  )
}
