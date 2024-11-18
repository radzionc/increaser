import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardItem } from './VisionBoardItem'
import { VisionBoardContainer } from './VisionBoardContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveVisionItem } from './ActiveVisionItem'

export const MyVisionBoard = () => {
  const { vision } = useUser()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveVisionItem />
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
