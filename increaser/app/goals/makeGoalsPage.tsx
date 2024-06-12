import { Page, GetLayout } from '@lib/next-ui/Page'
import { GoalsLayout } from './GoalsLayout'

const getLayout: GetLayout = (page) => <GoalsLayout>{page}</GoalsLayout>

export const makeGoalsPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
