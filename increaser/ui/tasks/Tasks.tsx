import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from '@increaser/ui/tasks/TasksView'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksRecurringView } from '@increaser/ui/tasks/TasksRecurringView'
import { TasksBacklogView } from '@increaser/ui/tasks/TasksBacklogView'
import { TasksToDoView } from './TasksToDoView'

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
          recurring={() => <TasksRecurringView />}
          done={() => <TasksDone />}
          todo={() => <TasksToDoView />}
          backlog={() => <TasksBacklogView />}
        />
      </TasksViewProvider>
    </TasksContainer>
  )
}
