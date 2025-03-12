import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { VStack } from '@lib/ui/css/stack'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getPublicFileUrl } from '@product/ui/storage/getPublicFileUrl'
import { useCurrentVisionAttribute } from '@product/ui/vision/CurrentVisionAttributeProvider'
import styled from 'styled-components'

import { TextOnlyVisionItemContainer } from './TextOnlyVisionItemContainer'
import { VisionBoardItemHeader } from './VisionBoardItemHeader'

const Image = styled.img`
  object-fit: cover;
`

const Container = styled(VStack)`
  overflow: hidden;
  ${borderRadius.m};
  ${interactive};

  position: relative;

  &:hover {
    ${VisionBoardItemHeader} {
      opacity: 1;
    }

    ${Image} {
      opacity: 0.8;
    }
  }
`

export const VisionBoardItem = () => {
  const { imageId, name, id, emoji } = useCurrentVisionAttribute()

  const [, setActiveItemId] = useActiveItemId()

  if (!imageId) {
    return (
      <TextOnlyVisionItemContainer onClick={() => setActiveItemId(id)}>
        {emoji} {name}
      </TextOnlyVisionItemContainer>
    )
  }

  return (
    <SafeImage
      key={imageId}
      src={getPublicFileUrl(shouldBePresent(imageId))}
      render={(props) => (
        <Container onClick={() => setActiveItemId(id)}>
          <Image {...props} />
          <VisionBoardItemHeader>
            <EmojiTextPrefix emoji={emoji} />
            {name}
          </VisionBoardItemHeader>
        </Container>
      )}
    />
  )
}
