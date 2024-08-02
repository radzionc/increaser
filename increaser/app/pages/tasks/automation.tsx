import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { ManageTaskFactories } from '@increaser/ui/taskFactories/ManageTaskFactories'

export default withLayout({
  page: ManageTaskFactories,
  layout: TasksLayout,
})
