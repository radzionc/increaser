import { ProductUpdatesPage } from '@increaser/ui/changelog/ProductUpdatesPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: ProductUpdatesPage,
  layout: AppPageLayout,
})
