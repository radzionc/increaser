import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { ScheduledTasksView } from '@increaser/ui/tasks/scheduled/ScheduledTasksView'

export default withLayout({
  page: ScheduledTasksView,
  layout: TasksLayout,
})
