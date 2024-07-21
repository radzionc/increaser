import { ComponentWithValueProps } from '@lib/ui/props'
import { ProductUpdate } from '../../changelog/ProductUpdate'
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

const Container = styled(VStack)`
  gap: 16px;
`

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  ${borderRadius.m}
  overflow: hidden;
  border: 2px solid ${getColor('primary')};
  aspect-ratio: 1592 / 1080;
  overflow: hidden;
`

const Video = styled(TakeWholeSpace)``

export const ChangelogItem = ({
  value,
}: ComponentWithValueProps<ProductUpdate>) => {
  return (
    <Container>
      <VStack gap={4}>
        <Text size={14} color="supporting">
          {format(value.releasedAt, 'MMMM d, yyyy')}
        </Text>
        <Text size={20} weight="semibold" color="contrast">
          {value.name}
        </Text>
      </VStack>
      <Text height="large">{value.description}</Text>
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
    </Container>
  )
}
