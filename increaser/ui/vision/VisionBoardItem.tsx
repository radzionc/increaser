import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { useCurrentVisionAttribute } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { VStack } from '@lib/ui/css/stack'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import styled from 'styled-components'
import { VisionBoardItemHeader } from './VisionBoardItemHeader'
import { interactive } from '@lib/ui/css/interactive'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

const Container = styled(VStack)`
  overflow: hidden;
  ${borderRadius.m};
  ${interactive};
`

const Image = styled.img`
  object-fit: cover;
`

export const VisionBoardItem = () => {
  const { imageId, name, id } = useCurrentVisionAttribute()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <SafeImage
      key={imageId}
      src={getPublicFileUrl(shouldBePresent(imageId))}
      render={(props) => (
        <Container onClick={() => setActiveItemId(id)}>
          <VisionBoardItemHeader>{name}</VisionBoardItemHeader>
          <Image {...props} />
        </Container>
      )}
    />
  )
}
