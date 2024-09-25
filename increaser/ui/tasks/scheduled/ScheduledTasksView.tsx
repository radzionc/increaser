import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { ScheduledTasks } from './ScheduledTasks'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ActiveTaskIdProvider } from '../state/activeTaskId'

const Container = styled(VStack)`
  gap: 32px;
  width: 100%;
  max-width: 560px;
`

export const ScheduledTasksView = () => {
  return (
    <Container>
      <PageHeaderControlsArea>
        <TaskTimeGroupingSelector />
      </PageHeaderControlsArea>
      <ActiveTaskIdProvider>
        <ScheduledTasks />
      </ActiveTaskIdProvider>
    </Container>
  )
}
