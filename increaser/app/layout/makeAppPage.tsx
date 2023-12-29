import { Page, GetLayout } from '@lib/next-ui/Page'
import { AppPageLayout } from '@increaser/app/focus/components/AppPageLayout'

const getAppPageLayout: GetLayout = (page) => (
  <AppPageLayout>{page}</AppPageLayout>
)

export const makeAppPage = (page: Page) => {
  page.getLayout = getAppPageLayout

  return page
}
