import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { order } from '@lib/utils/array/order'
import { useUser } from '@product/ui/user/state/user'
import { CurrentVisionAttributeProvider } from '@product/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardContainer } from '@product/ui/vision/VisionBoardContainer'
import { VisionBoardItem } from '@product/ui/vision/VisionBoardItem'

export const VisionDemo = () => {
  const { vision } = useUser()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  return (
    <ActiveItemIdProvider initialValue={null}>
      <VisionBoardContainer>
        {items.map((value) => (
          <CurrentVisionAttributeProvider key={value.id} value={value}>
            <VisionBoardItem />
          </CurrentVisionAttributeProvider>
        ))}
      </VisionBoardContainer>
    </ActiveItemIdProvider>
  )
}
