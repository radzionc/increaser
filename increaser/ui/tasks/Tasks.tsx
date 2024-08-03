import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from '@increaser/ui/tasks/TasksView'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksBacklogView } from '@increaser/ui/tasks/TasksBacklogView'
import { TasksToDoView } from './TasksToDoView'
import { ManageProjectFilter } from '../projects/filter/ManageProjectFilter'
import { ProjectFilterProvider } from '../projects/filter/ProjectFilterProvider'

const TasksContainer = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 32px;
`

export const Tasks = () => {
  return (
    <TasksViewProvider>
      <ProjectFilterProvider initialValue={null}>
        <HStack
          gap={20}
          fullWidth
          alignItems="center"
          justifyContent="space-between"
        >
          <TasksViewSelector />
          <ManageProjectFilter />
        </HStack>
        <TasksContainer>
          <RenderTasksView
            done={() => <TasksDone />}
            scheduled={() => <TasksToDoView />}
            backlog={() => <TasksBacklogView />}
          />
        </TasksContainer>
      </ProjectFilterProvider>
    </TasksViewProvider>
  )
}
