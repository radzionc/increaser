import { VStack } from '@lib/ui/layout/Stack'
import { AddVisionAttribute } from '@increaser/ui/vision/AddVisionAttribute'
import { VisionAttributes } from '@increaser/ui/vision/VisionAttributes'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

const Container = styled(VStack)`
  max-width: 560px;
`

export const VisionOnboardingStep = () => {
  return (
    <Container>
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          <VisionAttributes />
          <AddVisionAttribute />
        </ActiveItemIdProvider>
      </VStack>
    </Container>
  )
}
