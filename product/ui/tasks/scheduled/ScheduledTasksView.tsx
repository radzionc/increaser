import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import styled from 'styled-components'

import { AddTask } from '../AddTask'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'

import { ScheduledTasks } from './ScheduledTasks'

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
