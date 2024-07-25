import { ProductUpdates } from '@increaser/ui/changelog/ProductUpdates'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { FeaturesLayout } from '../../features/FeaturesLayout'

export default withLayout({
  page: ProductUpdates,
  layout: FeaturesLayout,
})
