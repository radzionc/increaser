import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useYouTubeFocusPreference } from '../state/useYouTubeFocusPreference'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useYouTubeFocusMusic } from '../YouTubeFocusMusicProvider'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`

const Wrapper = styled(VStack)`
  padding: 0 !important;
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  border: 1px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  border-left: 0;
  border-right: 0;
`

const youTubeVideoRatio = 9 / 16

const Control = styled(UnstyledButton)`
  padding: 8px 16px;

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  ${transition}

  &:hover {
    color: ${({ theme }) => theme.colors.contrast.toCssValue()};
  }
`

export const SoundsPlayer = () => {
  const [{ url }] = useYouTubeFocusPreference()
  const { focusSounds } = useAssertUserState()
  const { isPlaying, setState } = useYouTubeFocusMusic()

  if (!url) return null

  const sound = shouldBeDefined(focusSounds.find((sound) => sound.url === url))

  return (
    <Wrapper>
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
      <Control
        onClick={() => {
          setState((state) => ({ ...state, isPlaying: !isPlaying }))
        }}
      >
        <HStack gap={8} fullWidth alignItems="center">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <Text cropped>{sound.name}</Text>
        </HStack>
      </Control>
    </Wrapper>
  )
}
