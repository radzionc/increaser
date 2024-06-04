import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { VisionAttributesSection } from './VisionAttributesSection'
import { GoalsSection } from '@increaser/ui/goals/GoalsSection'

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
            <VisionAttributesSection />
            <GoalsSection />
          </Container>
        </UserStateOnly>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
