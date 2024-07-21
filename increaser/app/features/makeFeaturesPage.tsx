import { Page, GetLayout } from '@lib/next-ui/Page'
import { FeaturesLayout } from './FeaturesLayout'

const getLayout: GetLayout = (page) => <FeaturesLayout>{page}</FeaturesLayout>

export const makeFeaturesPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
