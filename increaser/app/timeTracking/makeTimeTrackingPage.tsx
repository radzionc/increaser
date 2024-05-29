import { Page, GetLayout } from '@lib/next-ui/Page'
import { TimeTrackingLayout } from './TimeTrackingLayout'

const getLayout: GetLayout = (page) => (
  <TimeTrackingLayout>{page}</TimeTrackingLayout>
)

export const makeTimeTrackingPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
