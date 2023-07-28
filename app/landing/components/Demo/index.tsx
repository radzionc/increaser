import YouTubePlayer from 'react-player/lazy'
import { useBoolean } from 'shared/hooks/useBoolean'
import styled from 'styled-components'
import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { IntersectionAware } from '@increaser/ui/ui/IntersectionAware'
import { LandingSlice } from '@increaser/ui/ui/landing/LandingSlice'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getVerticalMarginCSS } from '@increaser/ui/ui/utils/getVerticalMarginCSS'

const Container = styled(VStack)`
  ${getVerticalMarginCSS(80)};
`

const DEMO_URL = 'https://youtu.be/0No3EHVddlk'

const youTubeVideoRatio = 9 / 16

const PlayerWrapper = styled(VStack)<{ isActive: boolean }>`
  ${defaultBorderRadiusCSS};
  overflow: hidden;
  border: 2px dashed
    ${({ theme, isActive }) =>
      !isActive ? theme.colors.contrast.toCssValue() : 'transparent'};
`

export const DemoSlice = () => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)
  return (
    <LandingSlice>
      <Container alignItems="center" gap={40}>
        <Text
          style={{ textTransform: 'uppercase' }}
          centered
          height="large"
          weight="bold"
          size={32}
          as="h2"
          color="contrast"
        >
          Solve your problems with <br />
          <Text color="primary" as="span">
            deep work{' '}
            <Text as="span" color="shy">
              &
            </Text>{' '}
            daily habits
          </Text>
        </Text>

        <IntersectionAware<HTMLDivElement>
          render={({ ref, isIntersecting }) => {
            return (
              <VStack fullWidth ref={ref}>
                {isIntersecting && (
                  <ElementSizeAware
                    render={({ setElement, size }) => {
                      return (
                        <PlayerWrapper isActive={isPlaying} ref={setElement}>
                          {size && (
                            <YouTubePlayer
                              isActive
                              width={size.width}
                              height={size.width * youTubeVideoRatio}
                              url={DEMO_URL}
                              playing={isPlaying}
                              onPause={pause}
                              onPlay={play}
                              // config={{
                              //   youtube: {
                              //     playerVars: { autoplay: 1 },
                              //   },
                              // }}
                            />
                          )}
                        </PlayerWrapper>
                      )
                    }}
                  />
                )}
              </VStack>
            )
          }}
        />
      </Container>
    </LandingSlice>
  )
}
