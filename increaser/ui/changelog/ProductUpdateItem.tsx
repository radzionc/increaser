import { ComponentWithValueProps } from '@lib/ui/props'
import {
  ProductUpdate,
  productUpdateSocials,
} from '../../changelog/ProductUpdate'
import { VStack } from '@lib/ui/layout/Stack'
import { format } from 'date-fns'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { getPublicFileUrl } from '../storage/getPublicFileUrl'
import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { transition } from '@lib/ui/css/transition'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ProductUpdateSocialsPrompt } from './ProductUpdateSocialsPrompt'

const Container = styled(VStack)`
  gap: 16px;
`

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('mistExtra')};
  aspect-ratio: 1592 / 1080;
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

const Video = styled(TakeWholeSpace)``

export const ProductUpdateItem = ({
  value,
}: ComponentWithValueProps<ProductUpdate>) => {
  const hasSocials = productUpdateSocials.some((social) => !!value[social])

  return (
    <Container>
      <VStack gap={4}>
        <Text size={14} color="supporting">
          {format(value.releasedAt, 'MMMM d, yyyy')}
        </Text>
        <Text size={20} weight="semibold" color="contrast">
          {value.name}
        </Text>
        <Text color="supporting" height="large">
          {value.description}
        </Text>
      </VStack>
      <ClientOnly>
        <IntersectionAware<HTMLDivElement>
          render={({ ref, wasIntersected }) => {
            return (
              <VideoWrapper ref={ref}>
                {wasIntersected && (
                  <TakeWholeSpace>
                    <Video as="video" autoPlay muted loop>
                      <source
                        src={getPublicFileUrl(`updates/${value.videoId}.mp4`)}
                        type="video/mp4"
                      />
                    </Video>
                  </TakeWholeSpace>
                )}
              </VideoWrapper>
            )
          }}
        />
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
