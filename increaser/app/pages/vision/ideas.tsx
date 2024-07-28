import { withLayout } from '@lib/next-ui/utils/withLayout'
import { VisionLayout } from '../../vision/VisionLayout'
import { VisionIdeas } from '@increaser/ui/vision/VisionIdeas'

export default withLayout({
  page: VisionIdeas,
  layout: VisionLayout,
})
