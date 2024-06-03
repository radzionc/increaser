import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributes } from './VisionAttributes'
import { AddVisionAttribute } from './AddVisionAttribute'
import styled from 'styled-components'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { Goals } from '@increaser/ui/goals/Goals'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'

const title = 'Achieve your dreams'

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
            <ExpandableSection defaultIsOpen title="Your perfect life vision">
              <VStack gap={20}>
                <ProductEducationBlock value="vision" />
                <VStack>
                  <ActiveItemIdProvider initialValue={null}>
                    <VisionAttributes />
                    <AddVisionAttribute />
                  </ActiveItemIdProvider>
                </VStack>
              </VStack>
            </ExpandableSection>
            <ExpandableSection defaultIsOpen title="Your goals">
              <VStack gap={20}>
                <ProductEducationBlock value="goals" />
                <VStack>
                  <ActiveItemIdProvider initialValue={null}>
                    <Goals />
                    <AddGoal />
                  </ActiveItemIdProvider>
                </VStack>
              </VStack>
            </ExpandableSection>
          </Container>
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
