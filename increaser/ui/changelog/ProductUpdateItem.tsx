import { ComponentWithValueProps } from '@lib/ui/props'
import {
  ProductUpdate,
  productUpdateSocials,
} from '../../changelog/ProductUpdate'
import { VStack } from '@lib/ui/css/stack'
import { format } from 'date-fns'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { transition } from '@lib/ui/css/transition'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ProductUpdateSocialsPrompt } from './ProductUpdateSocialsPrompt'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import YouTubePlayer from 'react-player/lazy'
import { useBoolean } from '@lib/ui/hooks/useBoolean'

const Container = styled(VStack)`
  gap: 16px;
`

const youTubeVideoRatio = 9 / 16

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('mistExtra')};

  overflow: hidden;
`

const Indicator = styled(IconWrapper)`
  ${round};
  ${sameDimensions(24)};
  ${centerContent};
  color: ${getColor('success')};
  background: ${getColor('mist')};
  ${transition};
`

export const ProductUpdateItem = ({
  value,
}: ComponentWithValueProps<ProductUpdate>) => {
  const hasSocials = productUpdateSocials.some((social) => !!value[social])

  const [isPlaying, { set: play, unset: pause }] = useBoolean(false)

  return (
    <Container>
      <VStack gap={4}>
        <Text size={14} color="supporting">
          {format(value.releasedAt, 'MMMM d, yyyy')}
        </Text>
        <Text size={20} weight="500" color="contrast">
          {value.name}
        </Text>
        <Text color="supporting" height="l">
          {value.description}
        </Text>
      </VStack>
      <ClientOnly>
        {value.youtube && (
          <IntersectionAware<HTMLDivElement>
            render={({ ref, wasIntersected }) => (
              <VStack fullWidth ref={ref}>
                {wasIntersected && (
                  <ElementSizeAware
                    render={({ setElement, size }) => {
                      return (
                        <VideoWrapper ref={setElement}>
                          {size && (
                            <YouTubePlayer
                              isActive
                              width={size.width}
                              height={size.width * youTubeVideoRatio}
                              url={value.youtube}
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
              </VStack>
            )}
          />
        )}
      </ClientOnly>
      {hasSocials && <ProductUpdateSocialsPrompt value={value} />}
      {value.items && (
        <VStack>
          {value.items.map(({ description }) => {
            return (
              <PrefixedItemFrame
                key={description}
                prefix={
                  <Indicator>
                    <PlusIcon />
                  </Indicator>
                }
              >
                <Text>{description}</Text>
              </PrefixedItemFrame>
            )
          })}
        </VStack>
      )}
    </Container>
  )
}
