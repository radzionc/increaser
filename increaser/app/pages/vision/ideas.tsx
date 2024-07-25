import { withLayout } from '@lib/next-ui/utils/withLayout'
import { VisionIdeas } from '../../vision/VisionIdeas'
import { VisionLayout } from '../../vision/VisionLayout'

export default withLayout({
  page: VisionIdeas,
  layout: VisionLayout,
})
