import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { PauseIcon } from '@increaser/ui/icons/PauseIcon'
import { PlayIcon } from '@increaser/ui/icons/PlayIcon'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useFocusSounds } from '../useFocusSounds'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

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

  ${defaultTransitionCSS}

  :hover {
    color: ${({ theme }) => theme.colors.contrast.toCssValue()};
  }
`

export const SoundsPlayer = () => {
  const { sounds, activeSoundUrl, isPlaying, updateIsPlaying } =
    useFocusSounds()

  const sound = shouldBeDefined(
    sounds.find((sound) => sound.url === activeSoundUrl),
  )

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
                  onPause={() => updateIsPlaying(false)}
                  onPlay={() => updateIsPlaying(true)}
                  volume={0.8}
                  config={{
                    youtube: {
                      playerVars: { autoplay: 1 },
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
          updateIsPlaying(!isPlaying)
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
