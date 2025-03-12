import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TaskBoardPage } from '@product/ui/tasks/board/TaskBoardPage'

import { TasksLayout } from '../../tasks/TasksLayout'

export default withLayout({
  page: TaskBoardPage,
  layout: TasksLayout,
})
