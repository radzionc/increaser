import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { ProductUpdatesPage } from '../updates/ProductUpdatesPage'

export default withLayout({
  page: ProductUpdatesPage,
  layout: AppPageLayout,
})
