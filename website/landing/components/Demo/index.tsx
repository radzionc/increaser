import YouTubePlayer from 'react-player/lazy'
import { useBoolean } from '@increaser/ui/hooks/useBoolean'
import styled from 'styled-components'
import { borderRadius } from '@increaser/ui/css/borderRadius'
import { ElementSizeAware } from '@increaser/ui/base/ElementSizeAware'
import { IntersectionAware } from '@increaser/ui/IntersectionAware'
import { LandingSlice } from '@increaser/ui/landing/LandingSlice'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getVerticalMarginCSS } from '@increaser/ui/utils/getVerticalMarginCSS'
import { APP_DEMO_URL } from 'shared/externalResources'

const Container = styled(VStack)`
  ${getVerticalMarginCSS(80)};
`

const youTubeVideoRatio = 9 / 16

const PlayerWrapper = styled(VStack)<{ isActive: boolean }>`
  ${borderRadius.m};
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
                              url={APP_DEMO_URL}
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
