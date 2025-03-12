import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ScheduledTasksView } from '@product/ui/tasks/scheduled/ScheduledTasksView'

import { TasksLayout } from '../../tasks/TasksLayout'

export default withLayout({
  page: ScheduledTasksView,
  layout: TasksLayout,
})
