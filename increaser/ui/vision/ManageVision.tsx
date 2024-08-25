import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributes } from '@increaser/ui/vision/VisionAttributes'
import styled from 'styled-components'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'

const Container = styled(VStack)`
  max-width: 560px;
  gap: 32px;
`

export const ManageVision = () => {
  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <ProductEducationBlock value="vision" />
        <VStack>
          <VisionAttributes />
        </VStack>
      </ActiveItemIdProvider>
    </Container>
  )
}
