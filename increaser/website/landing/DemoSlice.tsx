import YouTubePlayer from 'react-player/lazy'
import styled, { css } from 'styled-components'
import { demoVideoUrl, productName } from '@increaser/config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/layout/Stack'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

const youTubeVideoRatio = 9 / 16

const PlayerWrapper = styled(VStack)<{ isActive: boolean }>`
  ${borderRadius.m};
  overflow: hidden;
  ${transition}
  border: 1px solid transparent;
  ${({ isActive, theme }) =>
    !isActive &&
    css`
      border-color: ${getColor('primary')};
      box-shadow: 0 0 20px 5px
        ${theme.colors.primary.getVariant({ a: () => 0.8 }).toCssValue()};
    `}
`

export const DemoSlice = () => {
  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title={`Unveiling the Power of ${productName}`}
          subtitle="Dive into an insightful demonstration and see how our app transforms your workday efficiency"
        />
        <IntersectionAware<HTMLDivElement>
          render={({ ref, wasIntersected }) => {
            return (
              <VStack fullWidth ref={ref}>
                {wasIntersected && (
                  <ElementSizeAware
                    render={({ setElement, size }) => {
                      return (
                        <PlayerWrapper isActive={isPlaying} ref={setElement}>
                          {size && (
                            <YouTubePlayer
                              isActive
                              width={size.width}
                              height={size.width * youTubeVideoRatio}
                              url={demoVideoUrl}
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
                        </PlayerWrapper>
                      )
                    }}
                  />
                )}
              </VStack>
            )
          }}
        />
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
