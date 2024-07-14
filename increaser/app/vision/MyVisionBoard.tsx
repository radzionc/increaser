import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  ${borderRadius.m};
`

export const Container = styled.div`
  column-gap: 8px;
  column-width: 280px;

  > * {
    margin-bottom: 8px;
  }
`

export const MyVisionBoard = () => {
  const { vision } = useAssertUserState()
  const items = order(
    Object.values(vision).filter((item) => item.imageId),
    (item) => item.order,
    'asc',
  )

  return (
    <Container>
      {items.map(({ imageId }) => (
        <SafeImage
          key={imageId}
          src={getPublicFileUrl(shouldBePresent(imageId))}
          render={(props) => <Image {...props} />}
        />
      ))}
    </Container>
  )
}
