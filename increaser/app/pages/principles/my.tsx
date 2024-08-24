import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PrinciplesPageLayout } from '../../principles/PrinciplesPageLayout'
import { Principles } from '@increaser/ui/principles/Principles'

export default withLayout({
  page: Principles,
  layout: PrinciplesPageLayout,
})
