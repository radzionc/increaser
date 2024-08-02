import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { RoadmapPage } from '../productFeatures/components/RoadmapPage'

export default withLayout({
  page: RoadmapPage,
  layout: AppPageLayout,
})
