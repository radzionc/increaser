import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksLayout } from '../../tasks/TasksLayout'
import { IdeasPage } from '../../ideas/IdeasPage'

export default withLayout({
  page: IdeasPage,
  layout: TasksLayout,
})
