import { Page, GetLayout } from 'components/Page'
import { AuthPageLayout } from 'auth/components/AuthPageLayout'

const getAuthPageLayout: GetLayout = (page) => (
  <AuthPageLayout>{page}</AuthPageLayout>
)

export const makeAuthPage = (page: Page) => {
  page.getLayout = getAuthPageLayout

  return page
}
