import { Page, GetLayout } from '@lib/next-ui/Page'
import { TasksLayout } from './TasksLayout'

const getLayout: GetLayout = (page) => <TasksLayout>{page}</TasksLayout>

export const makeTasksPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
