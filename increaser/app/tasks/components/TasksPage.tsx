import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { TasksDone } from './TasksDone'
import { TasksToDo } from './TasksToDo'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from './TasksView'
import { TasksDeadlinesOverview } from './TasksDeadlinesOverview'
import { TasksManagerProvider } from './TasksManagerProvider'
import { TasksContainer } from './TasksContainer'

export const TasksPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✅ Tasks`} title={<TasksViewSelector />} />
        <TasksContainer>
          <UserStateOnly>
            <TasksManagerProvider>
              <TasksDeadlinesOverview />
              <RenderTasksView
                todo={() => <TasksToDo />}
                done={() => <TasksDone />}
              />
            </TasksManagerProvider>
          </UserStateOnly>
        </TasksContainer>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
