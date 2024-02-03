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

export const TasksPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`🧘‍♀️ Habits`} title={<TasksViewSelector />} />
        <VStack gap={40} style={{ maxWidth: 520 }}>
          <UserStateOnly>
            <TasksDeadlinesOverview />
            <RenderTasksView
              todo={() => <TasksToDo />}
              done={() => <TasksDone />}
            />
          </UserStateOnly>
        </VStack>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
