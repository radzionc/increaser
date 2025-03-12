import { withLayout } from '@lib/next-ui/utils/withLayout'
import { Principles } from '@product/ui/principles/Principles'

import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'

export default withLayout({
  page: Principles,
  layout: PrinciplesPageLayout,
})
