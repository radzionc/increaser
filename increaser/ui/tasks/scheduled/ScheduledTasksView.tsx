import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { ScheduledTasks } from './ScheduledTasks'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'

const Container = styled(VStack)`
  gap: 32px;
  width: 100%;
  max-width: 560px;
`

export const ScheduledTasksView = () => {
  return (
    <Container>
      <TaskTimeGroupingSelector />
      <ActiveItemIdProvider initialValue={null}>
        <ScheduledTasks />
      </ActiveItemIdProvider>
    </Container>
  )
}
