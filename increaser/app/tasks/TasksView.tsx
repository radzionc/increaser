import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from '@increaser/ui/tasks/TasksView'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksRecurringView } from '@increaser/ui/tasks/TasksRecurringView'
import { TasksBacklog } from '@increaser/ui/tasks/TasksBacklog'
import { TasksToDoView } from './TasksToDoView'

const TasksContainer = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 40px;
`

export const TasksView = () => {
  return (
    <TasksContainer>
      <TasksViewProvider>
        <TasksViewSelector />
        <RenderTasksView
          recurring={() => <TasksRecurringView />}
          done={() => <TasksDone />}
          todo={() => <TasksToDoView />}
          backlog={() => <TasksBacklog />}
        />
      </TasksViewProvider>
    </TasksContainer>
  )
}
