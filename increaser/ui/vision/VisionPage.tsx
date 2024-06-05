import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributes } from './VisionAttributes'
import { AddVisionAttribute } from './AddVisionAttribute'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

const title = 'Your perfect life vision'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const VisionPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✨ ${title}`} title={title} />
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
    </FixedWidthContent>
  )
}
