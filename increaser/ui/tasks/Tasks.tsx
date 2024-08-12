import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  RenderTasksView,
  TasksViewProvider,
} from '@increaser/ui/tasks/TasksView'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksBacklogView } from '@increaser/ui/tasks/TasksBacklogView'
import { TasksToDoView } from './TasksToDoView'
import { ProjectFilterProvider } from '../projects/filter/ProjectFilterProvider'
import { TasksHeader } from './header/TasksHeader'

const TasksContainer = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 32px;
`

export const Tasks = () => {
  return (
    <TasksViewProvider>
      <ProjectFilterProvider initialValue={null}>
        <TasksHeader />
        <TasksContainer>
          <RenderTasksView
            done={() => <TasksDone />}
            todo={() => <TasksToDoView />}
            backlog={() => <TasksBacklogView />}
          />
        </TasksContainer>
      </ProjectFilterProvider>
    </TasksViewProvider>
  )
}
