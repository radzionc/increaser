import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { useCurrentVisionAttribute } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { getColor } from '@lib/ui/theme/getters'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import styled from 'styled-components'

const Content = styled.div`
  width: 100%;
  left: 0;
  top: 0%;
  position: absolute;
  opacity: 0;
  padding: 12px;
  background: ${({ theme }) =>
    theme.colors.contrast.getVariant({ a: () => 0.8 }).toCssValue()};
  color: ${getColor('background')};
`

const Container = styled(VStack)`
  position: relative;
  overflow: hidden;
  ${borderRadius.m};

  &:hover ${Content} {
    opacity: 1;
  }
`

const Image = styled.img`
  object-fit: cover;
`

export const VisionBoardItem = () => {
  const { imageId, emoji, name } = useCurrentVisionAttribute()

  return (
    <SafeImage
      key={imageId}
      src={getPublicFileUrl(shouldBePresent(imageId))}
      render={(props) => (
        <Container>
          <Image {...props} />
          <Content>
            <Text size={14} weight="semibold">
              <EmojiTextPrefix emoji={emoji} />
              {name}
            </Text>
          </Content>
        </Container>
      )}
    />
  )
}
