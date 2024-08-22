import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RoadmapPageLayout } from '../../productFeatures/components/RoadmapPageLayout'
import { ProductFeatureList } from '../../productFeatures/components/ProductFeatureList'

export default withLayout({
  page: () => <ProductFeatureList status="done" />,
  layout: RoadmapPageLayout,
})
