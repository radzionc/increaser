import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { TasksDone } from '@increaser/ui/tasks/TasksDone'
import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import {
  RenderTasksView,
  TasksViewProvider,
  TasksViewSelector,
} from '@increaser/ui/tasks/TasksView'
import { TasksDeadlinesOverview } from '@increaser/ui/tasks/TasksDeadlinesOverview'
import { TasksContainer } from '@increaser/ui/tasks/TasksContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TasksPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✅ Tasks`} title={<TasksViewSelector />} />
        <TasksContainer>
          <UserStateOnly>
            <ActiveItemIdProvider initialValue={null}>
              <TasksDeadlinesOverview />
              <RenderTasksView
                todo={() => <TasksToDo />}
                done={() => <TasksDone />}
              />
            </ActiveItemIdProvider>
          </UserStateOnly>
        </TasksContainer>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
