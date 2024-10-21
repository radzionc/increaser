import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { TaskBoardPage } from '@increaser/ui/tasks/board/TaskBoardPage'

export default withLayout({
  page: TaskBoardPage,
  layout: TasksLayout,
})
