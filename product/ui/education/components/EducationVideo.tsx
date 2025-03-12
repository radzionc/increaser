import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { IsActiveProp, ValueProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'

const Container = styled.div<IsActiveProp>`
  overflow: hidden;
  width: 100%;
  background: ${getColor('foreground')};
  aspect-ratio: 16 / 9;
`

export const EducationVideo = ({
  value,
  ...rest
}: ValueProp<string> & ComponentProps<typeof Container>) => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <Container isActive={isPlaying} {...rest} ref={setElement}>
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
        </Container>
      )}
    />
  )
}
