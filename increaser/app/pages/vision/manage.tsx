import { withLayout } from '@lib/next-ui/utils/withLayout'
import { VisionLayout } from '../../vision/VisionLayout'
import { ManageVision } from '@increaser/ui/vision/ManageVision'

export default withLayout({
  page: ManageVision,
  layout: VisionLayout,
})
