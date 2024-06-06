import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { Goals } from '@increaser/ui/goals/Goals'
import { AddGoal } from '@increaser/ui/goals/AddGoal'

const title = 'Your goals'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const GoalsPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✨ ${title}`} title={title} />
        <UserStateOnly>
          <Container>
            <VStack gap={20}>
              <ProductEducationBlock value="goals" />
              <VStack>
                <ActiveItemIdProvider initialValue={null}>
                  <Goals />
                  <AddGoal />
                </ActiveItemIdProvider>
              </VStack>
            </VStack>
          </Container>
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
