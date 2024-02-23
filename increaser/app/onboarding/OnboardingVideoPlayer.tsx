import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'

type OnboardingVideoPlayerProps = {
  youTubeVideoUrl: string
}

const youTubeVideoRatio = 9 / 16

const Container = styled.div`
  padding: 0;
`

export const OnboardingVideoPlayer = ({
  youTubeVideoUrl,
}: OnboardingVideoPlayerProps) => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(true)

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <Container ref={setElement}>
            {size && (
              <YouTubePlayer
                isActive
                width={size.width}
                height={size.width * youTubeVideoRatio}
                url={youTubeVideoUrl}
                playing={isPlaying}
                onPause={pause}
                onPlay={play}
                config={{
                  youtube: {
                    playerVars: { autoplay: 1, controls: 1 },
                  },
                }}
              />
            )}
          </Container>
        )
      }}
    />
  )
}
