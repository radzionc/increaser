import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { ScheduledTasks } from './ScheduledTasks'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ManageProjectFilter } from '../../projects/filter/ManageProjectFilter'
import { ProjectFilterProvider } from '../../projects/filter/ProjectFilterProvider'

const Container = styled(VStack)`
  gap: 32px;
  width: 100%;
  max-width: 560px;
`

export const ScheduledTasksView = () => {
  return (
    <ProjectFilterProvider initialValue={null}>
      <Container>
        <PageHeaderControlsArea>
          <TaskTimeGroupingSelector />
          <ManageProjectFilter />
        </PageHeaderControlsArea>
        <ActiveItemIdProvider initialValue={null}>
          <ScheduledTasks />
        </ActiveItemIdProvider>
      </Container>
    </ProjectFilterProvider>
  )
}
