import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'

import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getColor } from '@lib/ui/theme/getters'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'

const youTubeVideoRatio = 9 / 16

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${getColor('foreground')};
`

export const YouTubeFocusMusicPlayer = () => {
  const { focusSounds } = useAssertUserState()
  const [{ url }] = useYouTubeFocusPreference()
  const { isPlaying, setState } = useYouTubeFocusMusic()

  const sound = shouldBeDefined(focusSounds.find((sound) => sound.url === url))

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const height = (size?.width || 0) * youTubeVideoRatio

        return (
          <Container
            style={height ? { minHeight: height } : undefined}
            ref={setElement}
          >
            {size && sound && (
              <YouTubePlayer
                loop
                width={size.width}
                height={height}
                url={sound.url}
                playing={isPlaying}
                onPause={() =>
                  setState((state) => ({ ...state, isPlaying: false }))
                }
                onPlay={() =>
                  setState((state) => ({ ...state, isPlaying: true }))
                }
                volume={0.8}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      iv_load_policy: 3,
                    },
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
