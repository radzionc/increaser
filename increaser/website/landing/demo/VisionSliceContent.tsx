import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { VisionAttributeItemContent } from '@increaser/ui/vision/VisionAttributeItemContent'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

const Container = styled(UniformColumnGrid)`
  max-width: 920px;
  width: 100%;
`

export const VisionSliceContent = () => {
  const { vision } = useAssertUserState()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  return (
    <Container gap={20} minChildrenWidth={320}>
      {items.map((item) => (
        <CurrentVisionAttributeProvider key={item.id} value={item}>
          <VisionAttributeItemContent />
        </CurrentVisionAttributeProvider>
      ))}
    </Container>
  )
}
