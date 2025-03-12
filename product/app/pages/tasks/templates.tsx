import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TaskTemplates } from '@product/ui/taskTemplates/TaskTemplates'

import { TasksLayout } from '../../tasks/TasksLayout'

export default withLayout({
  page: TaskTemplates,
  layout: TasksLayout,
})
