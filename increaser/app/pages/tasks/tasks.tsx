import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { Tasks } from '@increaser/ui/tasks/Tasks'

export default withLayout({
  page: Tasks,
  layout: TasksLayout,
})
