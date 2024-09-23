import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { TaskBoard } from '@increaser/ui/tasks/board/TaskBoard'

export default withLayout({
  page: TaskBoard,
  layout: TasksLayout,
})
