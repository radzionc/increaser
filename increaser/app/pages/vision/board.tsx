import { withLayout } from '@lib/next-ui/utils/withLayout'
import { VisionLayout } from '../../vision/VisionLayout'
import { MyVisionBoard } from '@increaser/ui/vision/MyVisionBoard'

export default withLayout({
  page: MyVisionBoard,
  layout: VisionLayout,
})
