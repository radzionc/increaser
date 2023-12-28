import { Page, GetLayout } from '@increaser/app/layout/Page'
import { AuthPageLayout } from '@increaser/app/auth/components/AuthPageLayout'

const getAuthPageLayout: GetLayout = (page) => (
  <AuthPageLayout>{page}</AuthPageLayout>
)

export const makeAuthPage = (page: Page) => {
  page.getLayout = getAuthPageLayout

  return page
}
