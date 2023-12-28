import { Page, GetLayout } from '@increaser/app/layout/Page'
import { AppPageLayout } from '@increaser/app/focus/components/AppPageLayout'

const getAppPageLayout: GetLayout = (page) => (
  <AppPageLayout>{page}</AppPageLayout>
)

export const makeAppPage = (page: Page) => {
  page.getLayout = getAppPageLayout

  return page
}
