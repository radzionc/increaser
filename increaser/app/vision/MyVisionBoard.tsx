import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { visionImageAspectRatio } from '@increaser/ui/vision/visionImageAspectRatio'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const Image = styled.img`
  ${visionImageAspectRatio};
  width: 100%;
  object-fit: cover;
`

export const MyVisionBoard = () => {
  const { vision } = useAssertUserState()
  const items = order(
    Object.values(vision).filter((item) => item.imageId),
    (item) => item.order,
    'asc',
  )

  return (
    <UniformColumnGrid minChildrenWidth={280} gap={2}>
      {items.map(({ imageId }) => (
        <SafeImage
          key={imageId}
          src={getPublicFileUrl(shouldBePresent(imageId))}
          render={(props) => <Image {...props} />}
        />
      ))}
    </UniformColumnGrid>
  )
}
