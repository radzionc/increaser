import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ManageTaskFactories } from '@product/ui/taskFactories/ManageTaskFactories'

import { TasksLayout } from '../../tasks/TasksLayout'

export default withLayout({
  page: ManageTaskFactories,
  layout: TasksLayout,
})
