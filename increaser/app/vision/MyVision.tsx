import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributes } from '@increaser/ui/vision/VisionAttributes'
import { AddVisionAttribute } from '@increaser/ui/vision/AddVisionAttribute'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const MyVision = () => {
  return (
    <TasksViewProvider>
      <UserStateOnly>
        <Container>
          <VStack gap={20}>
            <ProductEducationBlock value="vision" />
            <VStack>
              <ActiveItemIdProvider initialValue={null}>
                <VisionAttributes />
                <AddVisionAttribute />
              </ActiveItemIdProvider>
            </VStack>
          </VStack>
        </Container>
      </UserStateOnly>
    </TasksViewProvider>
  )
}
