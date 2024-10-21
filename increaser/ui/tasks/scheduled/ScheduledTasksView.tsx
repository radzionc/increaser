import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { ScheduledTasks } from './ScheduledTasks'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { AddTask } from '../AddTask'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

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
        <AddTask />
      </PageHeaderControlsArea>
      <ActiveItemIdProvider initialValue={null}>
        <ScheduledTasks />
      </ActiveItemIdProvider>
    </Container>
  )
}
