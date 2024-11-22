import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionBoardContainer } from '@increaser/ui/vision/VisionBoardContainer'
import { VisionBoardItem } from '@increaser/ui/vision/VisionBoardItem'

export const VisionDemo = () => {
  const { vision } = useUser()
  const items = order(Object.values(vision), (item) => item.order, 'asc')
  console.log(items)

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
