import { VStack } from '@lib/ui/layout/Stack'
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

export const TasksPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✅ Tasks`} title={<TasksViewSelector />} />
        <VStack gap={40} style={{ maxWidth: 560 }}>
          <UserStateOnly>
            <TasksManagerProvider>
              <TasksDeadlinesOverview />
              <RenderTasksView
                todo={() => <TasksToDo />}
                done={() => <TasksDone />}
              />
            </TasksManagerProvider>
          </UserStateOnly>
        </VStack>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
