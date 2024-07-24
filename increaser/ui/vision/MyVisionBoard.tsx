import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardItem } from './VisionBoardItem'
import { VisionBoardContainer } from './VisionBoardContainer'

export const MyVisionBoard = () => {
  const { vision } = useAssertUserState()
  const items = order(
    Object.values(vision).filter((item) => item.imageId),
    (item) => item.order,
    'asc',
  )

  return (
    <VisionBoardContainer>
      {items.map((value) => (
        <CurrentVisionAttributeProvider key={value.id} value={value}>
          <VisionBoardItem />
        </CurrentVisionAttributeProvider>
      ))}
    </VisionBoardContainer>
  )
}
