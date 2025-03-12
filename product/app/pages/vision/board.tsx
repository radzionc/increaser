import { withLayout } from '@lib/next-ui/utils/withLayout'
import { MyVisionBoard } from '@product/ui/vision/MyVisionBoard'

import { VisionLayout } from '../../vision/VisionLayout'

export default withLayout({
  page: MyVisionBoard,
  layout: VisionLayout,
})
