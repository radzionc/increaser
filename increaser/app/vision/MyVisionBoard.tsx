import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardItem } from './VisionBoardItem'

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
      {items.map((value) => (
        <CurrentVisionAttributeProvider key={value.id} value={value}>
          <VisionBoardItem />
        </CurrentVisionAttributeProvider>
      ))}
    </Container>
  )
}
