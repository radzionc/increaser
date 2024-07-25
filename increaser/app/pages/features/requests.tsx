import { ProductFeaturesBoard } from '../../productFeatures/components/ProductFeaturesBoard'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { FeaturesLayout } from '../../features/FeaturesLayout'

export default withLayout({
  page: ProductFeaturesBoard,
  layout: FeaturesLayout,
})
