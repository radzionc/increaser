import { Page, GetLayout } from '@lib/next-ui/Page'
import { AuthPageLayout } from '@increaser/app/auth/components/AuthPageLayout'

const getAuthPageLayout: GetLayout = (page) => (
  <AuthPageLayout>{page}</AuthPageLayout>
)

export const makeAuthPage = (page: Page) => {
  page.getLayout = getAuthPageLayout

  return page
}
