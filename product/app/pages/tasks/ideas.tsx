import { withLayout } from '@lib/next-ui/utils/withLayout'

import { IdeasPage } from '../../ideas/IdeasPage'
import { TasksLayout } from '../../tasks/TasksLayout'

export default withLayout({
  page: IdeasPage,
  layout: TasksLayout,
})
