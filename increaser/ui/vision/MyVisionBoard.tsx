import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardItem } from './VisionBoardItem'
import { VisionBoardContainer } from './VisionBoardContainer'

export const MyVisionBoard = () => {
  const { vision } = useUser()
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
