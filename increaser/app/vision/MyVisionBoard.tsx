import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionAttributeItemContent } from '@increaser/ui/vision/VisionAttributeItemContent'

export const MyVisionBoard = () => {
  const { vision } = useAssertUserState()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  return (
    <UniformColumnGrid minChildrenWidth={304} gap={20}>
      {items.map((item) => (
        <CurrentVisionAttributeProvider key={item.id} value={item}>
          <VisionAttributeItemContent statusKind="shy" />
        </CurrentVisionAttributeProvider>
      ))}
    </UniformColumnGrid>
  )
}
