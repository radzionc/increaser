import { withLayout } from '@lib/next-ui/utils/withLayout'
import { MyVision } from '../../vision/MyVision'
import { VisionLayout } from '../../vision/VisionLayout'

export default withLayout({
  page: MyVision,
  layout: VisionLayout,
})
