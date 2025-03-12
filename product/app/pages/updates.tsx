import { withLayout } from '@lib/next-ui/utils/withLayout'

import { AppPageLayout } from '../ui/page/AppPageLayout'
import { ProductUpdatesPage } from '../updates/ProductUpdatesPage'

export default withLayout({
  page: ProductUpdatesPage,
  layout: AppPageLayout,
})
