import { Page, GetLayout } from 'components/Page'
import { AppPageLayout } from 'focus/components/AppPageLayout'

const getAppPageLayout: GetLayout = (page) => (
  <AppPageLayout>{page}</AppPageLayout>
)

export const makeAppPage = (page: Page) => {
  page.getLayout = getAppPageLayout

  return page
}
