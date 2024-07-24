import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { useCurrentVisionAttribute } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { VStack } from '@lib/ui/layout/Stack'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import styled from 'styled-components'
import { VisionBoardItemHeader } from './VisionBoardItemHeader'

const Container = styled(VStack)`
  overflow: hidden;
  ${borderRadius.m};
`

const Image = styled.img`
  object-fit: cover;
`

export const VisionBoardItem = () => {
  const { imageId, name } = useCurrentVisionAttribute()

  return (
    <SafeImage
      key={imageId}
      src={getPublicFileUrl(shouldBePresent(imageId))}
      render={(props) => (
        <Container>
          <VisionBoardItemHeader>{name}</VisionBoardItemHeader>
          <Image {...props} />
        </Container>
      )}
    />
  )
}
