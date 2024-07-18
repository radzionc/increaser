import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributes } from '@increaser/ui/vision/VisionAttributes'
import { AddVisionAttribute } from '@increaser/ui/vision/AddVisionAttribute'
import { useMyVisionView } from './MyVisionView'
import { Match } from '@lib/ui/base/Match'
import { MyVisionBoard } from '@increaser/ui/vision/MyVisionBoard'
import styled from 'styled-components'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'

const Container = styled(VStack)`
  max-width: 560px;
`

export const MyVisionContent = () => {
  const [view] = useMyVisionView()

  return (
    <Match
      value={view}
      manage={() => (
        <Container>
          <ActiveItemIdProvider initialValue={null}>
            <ProductEducationBlock value="vision" />
            <VisionAttributes />
            <AddVisionAttribute />
          </ActiveItemIdProvider>
        </Container>
      )}
      board={() => <MyVisionBoard />}
    />
  )
}
