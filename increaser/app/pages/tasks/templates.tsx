import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { TaskTemplates } from '@increaser/ui/taskTemplates/TaskTemplates'

export default withLayout({
  page: TaskTemplates,
  layout: TasksLayout,
})
