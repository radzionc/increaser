import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { VisionAttributeItemContent } from '@increaser/ui/vision/VisionAttributeItemContent'

const Container = styled(VStack)`
  max-width: 480px;
  width: 100%;
  gap: 8px;
`

export const VisionSliceContent = () => {
  const { vision } = useAssertUserState()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  return (
    <Container>
      {items.map((item) => (
        <CurrentVisionAttributeProvider key={item.id} value={item}>
          <VisionAttributeItemContent />
        </CurrentVisionAttributeProvider>
      ))}
    </Container>
  )
}
