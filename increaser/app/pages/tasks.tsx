import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TasksPage } from '../tasks/TasksPage'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: TasksPage,
  layout: AppPageLayout,
})
