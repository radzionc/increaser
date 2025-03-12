import { withLayout } from '@lib/next-ui/utils/withLayout'

import { ProductFeatureList } from '../../productFeatures/components/ProductFeatureList'
import { RoadmapPageLayout } from '../../productFeatures/components/RoadmapPageLayout'

export default withLayout({
  page: () => <ProductFeatureList status="done" />,
  layout: RoadmapPageLayout,
})
