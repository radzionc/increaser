import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from '@increaser/ui/tasks/TasksView'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksBacklogView } from '@increaser/ui/tasks/TasksBacklogView'
import { TasksToDoView } from './TasksToDoView'
import { ManageTaskFactories } from '../taskFactories/ManageTaskFactories'

const TasksContainer = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 32px;
`

export const Tasks = () => {
  return (
    <TasksContainer>
      <TasksViewProvider>
        <TasksViewSelector />
        <RenderTasksView
          recurring={() => <ManageTaskFactories />}
          done={() => <TasksDone />}
          todo={() => <TasksToDoView />}
          backlog={() => <TasksBacklogView />}
        />
      </TasksViewProvider>
    </TasksContainer>
  )
}
